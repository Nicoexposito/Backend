const express = require('express');
const router = express.Router();
const pagamentController = require('../controllers/pagamentController');

/**
 * @swagger
 * tags:
 *   name: Pagaments
 *   description: Gestió de pagaments
 */

/**
 * @swagger
 * /api/pagaments:
 *   post:
 *     summary: Crear un nou pagament
 *     tags: [Pagaments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - metode
 *             properties:
 *               metode:
 *                 type: string
 *                 enum: [targeta]
 *                 example: targeta
 *               estat:
 *                 type: string
 *                 enum: [acceptat, rebutjat, pendent]
 *                 default: pendent
 *               dataPagament:
 *                 type: string
 *                 format: date-time
 *                 description: Data del pagament
 *     responses:
 *       201:
 *         description: Pagament creat correctament
 *       400:
 *         description: Dades invàlides
 */
router.post('/', pagamentController.createPagament);

/**
 * @swagger
 * /api/pagaments:
 *   get:
 *     summary: Obtenir tots els pagaments
 *     tags: [Pagaments]
 *     responses:
 *       200:
 *         description: Llista de pagaments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pagament'
 */
router.get('/', pagamentController.getPagaments);

/**
 * @swagger
 * /api/pagaments/{id}:
 *   put:
 *     summary: Actualitzar un pagament per ID
 *     tags: [Pagaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pagament
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pagament'
 *     responses:
 *       200:
 *         description: Pagament actualitzat correctament
 *       404:
 *         description: Pagament no trobat
 */
router.put('/:id', pagamentController.updatePagament);

/**
 * @swagger
 * /api/pagaments/{id}:
 *   delete:
 *     summary: Eliminar un pagament per ID
 *     tags: [Pagaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pagament
 *     responses:
 *       200:
 *         description: Pagament eliminat correctament
 *       404:
 *         description: Pagament no trobat
 */
router.delete('/:id', pagamentController.deletePagament);

module.exports = router;
