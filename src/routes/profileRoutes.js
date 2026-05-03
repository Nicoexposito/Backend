const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Totes les rutes requereixen autenticació
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Perfil
 *   description: Gestió del perfil d'usuari
 */

/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Obtenir el perfil de l'usuari autenticat
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil de l'usuari
 *       401:
 *         description: No autenticat
 *       404:
 *         description: Usuari no trobat
 */
router.get('/me', profileController.getProfile);

/**
 * @swagger
 * /api/profile/me:
 *   put:
 *     summary: Actualitzar dades personals
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               primerCognom:
 *                 type: string
 *               segonCognom:
 *                 type: string
 *               telefon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualitzat
 *       400:
 *         description: Dades invàlides
 */
router.put('/me', profileController.updateProfile);

/**
 * @swagger
 * /api/profile/me/password:
 *   put:
 *     summary: Canviar contrasenya
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contrasenya canviada
 *       400:
 *         description: Contrasenya incorrecta o dades invàlides
 */
router.put('/me/password', profileController.changePassword);

/**
 * @swagger
 * /api/profile/me/avatar:
 *   put:
 *     summary: Actualitzar foto de perfil (base64)
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imatgePerfil
 *             properties:
 *               imatgePerfil:
 *                 type: string
 *                 description: Imatge en format base64
 *     responses:
 *       200:
 *         description: Imatge actualitzada
 *       400:
 *         description: Imatge no proporcionada o massa gran
 */
router.put('/me/avatar', profileController.updateAvatar);

/**
 * @swagger
 * /api/profile/me/privacy:
 *   put:
 *     summary: Actualitzar configuració de privacitat
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mostrarEmail:
 *                 type: boolean
 *               mostrarTelefon:
 *                 type: boolean
 *               perfilPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Privacitat actualitzada
 */
router.put('/me/privacy', profileController.updatePrivacy);

module.exports = router;
