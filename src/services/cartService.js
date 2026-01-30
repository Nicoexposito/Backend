const Cart = require('../models/cart');
const Producte = require('../models/product');

// Obtener carrito por sessionId
const getCart = async (sessionId) => {
    let cart = await Cart.findOne({ sessionId }).populate('items.productId');
    if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
    }
    return cart;
};

// Añadir producto al carrito
const addToCart = async (sessionId, productId, quantity = 1) => {
    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
        cart = new Cart({ sessionId, items: [] });
    }

    // Verificar que el producto existe
    const product = await Producte.findById(productId);
    if (!product) {
        throw new Error('Producte no trobat');
    }

    // Buscar si el producto ya está en el carrito
    const existingItem = cart.items.find(
        item => item.productId.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save();
    return cart.populate('items.productId');
};

// Eliminar producto del carrito
const removeFromCart = async (sessionId, productId) => {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
        throw new Error('Carret no trobat');
    }

    cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
    );

    await cart.save();
    return cart.populate('items.productId');
};

// Vaciar carrito
const clearCart = async (sessionId) => {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
        throw new Error('Carret no trobat');
    }

    cart.items = [];
    await cart.save();
    return cart;
};

// Actualizar cantidad de un item
const updateQuantity = async (sessionId, productId, quantity) => {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
        throw new Error('Carret no trobat');
    }

    const item = cart.items.find(
        item => item.productId.toString() === productId
    );

    if (!item) {
        throw new Error('Producte no trobat al carret');
    }

    if (quantity <= 0) {
        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );
    } else {
        item.quantity = quantity;
    }

    await cart.save();
    return cart.populate('items.productId');
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
};
