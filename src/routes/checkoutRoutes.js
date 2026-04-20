const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint per crear la sessió de Stripe (Protegit)
router.post('/create-session', express.json(), authMiddleware, checkoutController.createCheckoutSession);

// Endpoint per al Webhook de Stripe (NO Protegit, Stripe el crida directament)
// IMPORTANT: Aquesta ruta necessita express.raw() per validar la signatura.
router.post('/webhook', express.raw({ type: 'application/json' }), checkoutController.handleWebhook);

module.exports = router;
