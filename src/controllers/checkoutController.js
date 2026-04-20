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

        res.json({ status: 'success', sessionId: session.id, url: session.url });

    } catch (error) {
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
            console.log(`Venta ${comandaId} marcada com a PAGAT`);
        } catch (dbErr) {
            console.error('Error actualitzant DB al webhook:', dbErr);
        }
    }

    res.json({ received: true });
};
