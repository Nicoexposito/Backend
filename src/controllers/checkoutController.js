const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Venta = require('../models/venta');
const Usuari = require('../models/usuari');

// Crear una sessió de Stripe Checkout
exports.createCheckoutSession = async (req, res) => {
    try {
        const { comandaId } = req.body;

        const venta = await Venta.findById(comandaId);
        if (!venta) {
            return res.status(404).json({ message: 'Venta no trobada.' });
        }

        // Recuperar l'email de l'usuari de la BD ja que no està al token
        const usuari = await Usuari.findById(req.user.id);
        if (!usuari) {
            return res.status(404).json({ message: 'Usuari no trobat.' });
        }

        // Crear line items per Stripe
        const line_items = venta.items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.nom,
                },
                unit_amount: Math.round(item.preu * 100), // Stripe usa cèntims
            },
            quantity: item.quantitat,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${venta._id}`,
            cancel_url: 'http://localhost:5173/checkout/cancel',
            customer_email: usuari.email,
            metadata: {
                comandaId: venta._id.toString(),
            },
        });

        req.log.info({
          orderId: venta._id,
          userId: usuari._id,
          sessionId: session.id
        }, 'Stripe session created');

        res.json({ status: 'success', sessionId: session.id, url: session.url });

    } catch (error) {
        req.log.error({
          error: error.message,
          userId: req.user?.id || 'unknown'
        }, 'Payment session creation failed');
        console.error('Error Stripe Session:', error);
        res.status(500).json({ message: error.message });
    }
};

// Webhook per rebre confirmacions de Stripe
exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, // Body ha de ser Buffer/Raw
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gestionar el event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const comandaId = session.metadata.comandaId;

        // Actualitzar comanda a "pagat"
        try {
            await Venta.findByIdAndUpdate(comandaId, { estat: 'pagat' });
            req.log.info({
              orderId: comandaId,
              sessionId: session.id
            }, 'Payment confirmed');
            console.log(`Venta ${comandaId} marcada com a PAGAT`);
        } catch (dbErr) {
            req.log.error({
              orderId: comandaId,
              error: dbErr.message
            }, 'Error updating order after payment');
            console.error('Error actualitzant DB al webhook:', dbErr);
        }
    } else if (event.type === 'checkout.session.expired' || event.type === 'checkout.session.async_payment_failed') {
        const session = event.data.object;
        const comandaId = session.metadata?.comandaId;
        req.log.warn({
          orderId: comandaId,
          sessionId: session.id,
          type: event.type
        }, 'Payment failed or session expired');
    }

    res.json({ received: true });
};
