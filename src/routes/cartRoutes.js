const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestió del carret de compra
 */

/**
 * @swagger
 * /api/cart/{sessionId}:
 *   get:
 *     summary: Obtenir el carret per sessionId
 *     tags: [Cart]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de sessió del carret
 *     responses:
 *       200:
 *         description: Carret obtingut correctament
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carret no trobat
 */
router.get('/:sessionId', cartController.getCart);

/**
 * @swagger
 * /api/cart/{sessionId}/add:
 *   post:
 *     summary: Afegir un producte al carret
 *     tags: [Cart]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de sessió del carret
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producte a afegir
 *               quantity:
 *                 type: number
 *                 default: 1
 *                 description: Quantitat a afegir
 *     responses:
 *       200:
 *         description: Producte afegit al carret
 *       400:
 *         description: Dades invàlides
 */
router.post('/:sessionId/add', cartController.addToCart);

/**
 * @swagger
 * /api/cart/{sessionId}/item/{productId}:
 *   put:
 *     summary: Actualitzar la quantitat d'un producte al carret
 *     tags: [Cart]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de sessió del carret
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 description: Nova quantitat
 *     responses:
 *       200:
 *         description: Quantitat actualitzada
 *       404:
 *         description: Producte no trobat al carret
 */
router.put('/:sessionId/item/:productId', cartController.updateQuantity);

/**
 * @swagger
 * /api/cart/{sessionId}/item/{productId}:
 *   delete:
 *     summary: Eliminar un producte del carret
 *     tags: [Cart]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de sessió del carret
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producte a eliminar
 *     responses:
 *       200:
 *         description: Producte eliminat del carret
 *       404:
 *         description: Producte no trobat al carret
 */
router.delete('/:sessionId/item/:productId', cartController.removeFromCart);

/**
 * @swagger
 * /api/cart/{sessionId}:
 *   delete:
 *     summary: Buidar tot el carret
 *     tags: [Cart]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de sessió del carret
 *     responses:
 *       200:
 *         description: Carret buidat correctament
 *       404:
 *         description: Carret no trobat
 */
router.delete('/:sessionId', cartController.clearCart);

module.exports = router;
