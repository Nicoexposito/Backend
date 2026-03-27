const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Gestió de vendes
 */

/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Crear una nova venta (usuari autenticat)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - total
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID del producte
 *                     nom:
 *                       type: string
 *                       description: Nom del producte
 *                     quantitat:
 *                       type: number
 *                       description: Quantitat
 *                     preu:
 *                       type: number
 *                       description: Preu unitari
 *                     talla:
 *                       type: string
 *                       enum: [XS, S, M, L, XL]
 *               total:
 *                 type: number
 *                 description: Total de la venta
 *                 example: 179.98
 *               metodePagament:
 *                 type: string
 *                 enum: [targeta, paypal, transferencia, altres]
 *                 example: targeta
 *               adreca:
 *                 type: object
 *                 properties:
 *                   carrer:
 *                     type: string
 *                     example: "Carrer Major 10"
 *                   ciutat:
 *                     type: string
 *                     example: "Barcelona"
 *                   codiPostal:
 *                     type: string
 *                     example: "08001"
 *                   pais:
 *                     type: string
 *                     example: "Espanya"
 *     responses:
 *       201:
 *         description: Venta creada correctament
 *       401:
 *         description: No autoritzat
 */
router.post('/', authMiddleware, ventaController.createVenta);

/**
 * @swagger
 * /api/ventas/meves:
 *   get:
 *     summary: Obtenir les vendes de l'usuari autenticat
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de vendes de l'usuari
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       401:
 *         description: No autoritzat
 */
router.get('/meves', authMiddleware, ventaController.getMesVendes);

/**
 * @swagger
 * /api/ventas/admin:
 *   get:
 *     summary: Obtenir totes les vendes (només admin)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de totes les vendes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       401:
 *         description: No autoritzat
 *       403:
 *         description: Accés denegat (no és admin)
 */
router.get('/admin', authMiddleware, roleMiddleware('admin'), ventaController.getAllVendes);

/**
 * @swagger
 * /api/ventas/{id}:
 *   get:
 *     summary: Obtenir una venta per ID (propietari o admin)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta trobada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       401:
 *         description: No autoritzat
 *       404:
 *         description: Venta no trobada
 */
router.get('/:id', authMiddleware, ventaController.getVentaById);

/**
 * @swagger
 * /api/ventas/{id}/estat:
 *   put:
 *     summary: Actualitzar l'estat d'una venta (només admin)
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estat
 *             properties:
 *               estat:
 *                 type: string
 *                 enum: [pendent, completada, enviada, entregada, cancel·lada]
 *                 description: Nou estat de la venta
 *     responses:
 *       200:
 *         description: Estat actualitzat correctament
 *       401:
 *         description: No autoritzat
 *       403:
 *         description: Accés denegat (no és admin)
 *       404:
 *         description: Venta no trobada
 */
router.put('/:id/estat', authMiddleware, roleMiddleware('admin'), ventaController.updateEstatVenta);

module.exports = router;
