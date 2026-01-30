const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Obtener carrito por sessionId
router.get('/:sessionId', cartController.getCart);

// Añadir producto al carrito
router.post('/:sessionId/add', cartController.addToCart);

// Actualizar cantidad de un producto
router.put('/:sessionId/item/:productId', cartController.updateQuantity);

// Eliminar producto del carrito
router.delete('/:sessionId/item/:productId', cartController.removeFromCart);

// Vaciar carrito
router.delete('/:sessionId', cartController.clearCart);

module.exports = router;
