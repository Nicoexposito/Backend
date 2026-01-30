const cartService = require('../services/cartService');

// Obtener carrito
const getCart = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const cart = await cartService.getCart(sessionId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Añadir producto al carrito
const addToCart = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'productId és requerit' });
        }

        const cart = await cartService.addToCart(sessionId, productId, quantity || 1);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Eliminar producto del carrito
const removeFromCart = async (req, res) => {
    try {
        const { sessionId, productId } = req.params;
        const cart = await cartService.removeFromCart(sessionId, productId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Vaciar carrito
const clearCart = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const cart = await cartService.clearCart(sessionId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Actualizar cantidad
const updateQuantity = async (req, res) => {
    try {
        const { sessionId, productId } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).json({ status: 'error', message: 'quantity és requerit' });
        }

        const cart = await cartService.updateQuantity(sessionId, productId, quantity);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
};
