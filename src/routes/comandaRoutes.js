const express = require('express');
const router = express.Router();
const comandaController = require('../controllers/comandaController');

/**
 * @swagger
 * tags:
 *   name: Comandes
 *   description: Gestió de comandes
 */

/**
 * @swagger
 * /api/comandes:
 *   post:
 *     summary: Crear una nova comanda
 *     tags: [Comandes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantitat_total
 *             properties:
 *               dataComanda:
 *                 type: string
 *                 format: date-time
 *                 description: Data de la comanda
 *               estat:
 *                 type: string
 *                 enum: [pendent, enviada, entregada, cancel·lada]
 *                 default: pendent
 *               quantitat_total:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Comanda creada correctament
 *       400:
 *         description: Dades invàlides
 */
router.post('/', comandaController.createComanda);

/**
 * @swagger
 * /api/comandes:
 *   get:
 *     summary: Obtenir totes les comandes
 *     tags: [Comandes]
 *     responses:
 *       200:
 *         description: Llista de comandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comanda'
 */
router.get('/', comandaController.getComandes);

/**
 * @swagger
 * /api/comandes/{id}:
 *   put:
 *     summary: Actualitzar una comanda per ID
 *     tags: [Comandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la comanda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comanda'
 *     responses:
 *       200:
 *         description: Comanda actualitzada correctament
 *       404:
 *         description: Comanda no trobada
 */
router.put('/:id', comandaController.updateComanda);

/**
 * @swagger
 * /api/comandes/{id}:
 *   delete:
 *     summary: Eliminar una comanda per ID
 *     tags: [Comandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la comanda
 *     responses:
 *       200:
 *         description: Comanda eliminada correctament
 *       404:
 *         description: Comanda no trobada
 */
router.delete('/:id', comandaController.deleteComanda);

module.exports = router;
