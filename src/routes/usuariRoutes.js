const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const usuariController = require('../controllers/usuariController');

/**
 * @swagger
 * tags:
 *   name: Usuaris
 *   description: Gestió d'usuaris
 */

/**
 * @swagger
 * /api/usuari/registre:
 *   post:
 *     summary: Registrar un nou usuari
 *     tags: [Usuaris]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - primerCognom
 *               - email
 *               - contrasenya
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Maria
 *               primerCognom:
 *                 type: string
 *                 example: Puig
 *               segonCognom:
 *                 type: string
 *                 example: Ferrer
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@example.com
 *               contrasenya:
 *                 type: string
 *                 example: password123
 *               telefon:
 *                 type: string
 *                 example: "698765432"
 *               rol:
 *                 type: string
 *                 enum: [client, admin]
 *                 example: client
 *     responses:
 *       201:
 *         description: Usuari registrat correctament
 *       400:
 *         description: Dades invàlides o email ja existent
 */
router.post('/registre', usuariController.registre);

/**
 * @swagger
 * /api/usuari/login:
 *   post:
 *     summary: Login d'usuari
 *     tags: [Usuaris]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenya
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@example.com
 *               contrasenya:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login correcte
 *       401:
 *         description: Credencials incorrectes
 */
router.post('/login', usuariController.login);

/**
 * @swagger
 * /api/usuari:
 *   post:
 *     summary: Crear un nou usuari (CRUD)
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuari'
 *     responses:
 *       201:
 *         description: Usuari creat correctament
 *       400:
 *         description: Dades invàlides
 */
router.post('/', usuariController.createUsuari);

/**
 * @swagger
 * /api/usuari:
 *   get:
 *     summary: Obtenir tots els usuaris
 *     tags: [Usuaris]
 *     responses:
 *       200:
 *         description: Llista d'usuaris
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuari'
 */
router.get('/', usuariController.getUsuaris);

// -----------------
// RUTAS DINÁMICAS CON PARAMETRO ID
// Con validación de ObjectId para evitar errores
// -----------------
router.use('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ status: 'error', message: 'ID no vàlid' });
  }
  next();
});

/**
 * @swagger
 * /api/usuari/{id}:
 *   get:
 *     summary: Obtenir un usuari per ID
 *     tags: [Usuaris]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'usuari
 *     responses:
 *       200:
 *         description: Usuari trobat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuari'
 *       400:
 *         description: ID no vàlid
 *       404:
 *         description: Usuari no trobat
 */
router.get('/:id', usuariController.getUsuariById);

/**
 * @swagger
 * /api/usuari/{id}:
 *   put:
 *     summary: Actualitzar un usuari per ID
 *     tags: [Usuaris]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'usuari
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuari'
 *     responses:
 *       200:
 *         description: Usuari actualitzat correctament
 *       400:
 *         description: ID no vàlid o dades incorrectes
 *       404:
 *         description: Usuari no trobat
 */
router.put('/:id', usuariController.updateUsuari);

/**
 * @swagger
 * /api/usuari/{id}:
 *   delete:
 *     summary: Eliminar un usuari per ID
 *     tags: [Usuaris]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'usuari
 *     responses:
 *       200:
 *         description: Usuari eliminat correctament
 *       400:
 *         description: ID no vàlid
 *       404:
 *         description: Usuari no trobat
 */
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
