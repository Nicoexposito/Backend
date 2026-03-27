const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestió de productes
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtenir tots els productes
 *     tags: [Products]
 *     security: []
 *     responses:
 *       200:
 *         description: Llista de productes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producte'
 */
router.get('/', productController.getProductes);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtenir un producte per ID
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producte
 *     responses:
 *       200:
 *         description: Producte trobat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producte'
 *       404:
 *         description: Producte no trobat
 */
router.get('/:id', productController.getProducteById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nou producte (només admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - equip
 *               - color
 *               - preu
 *               - stock
 *               - imageSrc
 *               - imageAlt
 *             properties:
 *               name:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                     example: "Home Kit 24/25"
 *                   es:
 *                     type: string
 *                     example: "Equipación Local 24/25"
 *               equip:
 *                 type: string
 *                 example: "FC Barcelona"
 *               color:
 *                 type: object
 *                 properties:
 *                   en:
 *                     type: string
 *                     example: "Home"
 *                   es:
 *                     type: string
 *                     example: "Local"
 *               talla:
 *                 type: string
 *                 enum: [XS, S, M, L, XL]
 *                 example: M
 *               preu:
 *                 type: string
 *                 example: "89.99"
 *               stock:
 *                 type: number
 *                 example: 100
 *               imageSrc:
 *                 type: string
 *                 example: "/images/barca-home.jpg"
 *               imageAlt:
 *                 type: string
 *                 example: "FC Barcelona Home Kit"
 *               liga:
 *                 type: string
 *                 example: "La Liga"
 *               marca:
 *                 type: string
 *                 example: "Nike"
 *               colorPrincipal:
 *                 type: string
 *                 example: "Blaugrana"
 *               descripcio:
 *                 type: string
 *                 example: "Samarreta oficial del FC Barcelona"
 *     responses:
 *       201:
 *         description: Producte creat correctament
 *       401:
 *         description: No autoritzat
 *       403:
 *         description: Accés denegat (no és admin)
 */
router.post('/', authMiddleware, roleMiddleware('admin'), productController.createProducte);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualitzar un producte (només admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producte'
 *     responses:
 *       200:
 *         description: Producte actualitzat correctament
 *       401:
 *         description: No autoritzat
 *       403:
 *         description: Accés denegat (no és admin)
 *       404:
 *         description: Producte no trobat
 */
router.put('/:id', authMiddleware, roleMiddleware('admin'), productController.updateProducte);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producte (només admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producte
 *     responses:
 *       200:
 *         description: Producte eliminat correctament
 *       401:
 *         description: No autoritzat
 *       403:
 *         description: Accés denegat (no és admin)
 *       404:
 *         description: Producte no trobat
 */
router.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.deleteProducte);

module.exports = router;
