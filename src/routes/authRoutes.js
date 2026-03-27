const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticació d'usuaris
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registre d'un nou usuari
 *     tags: [Auth]
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
 *                 example: Joan
 *               primerCognom:
 *                 type: string
 *                 example: Garcia
 *               segonCognom:
 *                 type: string
 *                 example: López
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joan@example.com
 *               contrasenya:
 *                 type: string
 *                 example: password123
 *               telefon:
 *                 type: string
 *                 example: "612345678"
 *               rol:
 *                 type: string
 *                 enum: [client, admin]
 *                 example: client
 *     responses:
 *       201:
 *         description: Usuari registrat correctament
 *       400:
 *         description: Dades invàlides o email ja registrat
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login d'usuari
 *     tags: [Auth]
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
 *                 example: joan@example.com
 *               contrasenya:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login correcte, retorna accessToken i refreshToken
 *       401:
 *         description: Credencials incorrectes
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renovar el token d'accés
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token obtingut al fer login
 *     responses:
 *       200:
 *         description: Nou accessToken generat
 *       401:
 *         description: Refresh token invàlid o expirat
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Tancar sessió (invalidar refresh token)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token a invalidar
 *     responses:
 *       200:
 *         description: Sessió tancada correctament
 *       400:
 *         description: Token no proporcionat
 */
router.post("/logout", authController.logout);

module.exports = router;