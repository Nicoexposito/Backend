const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

// RUTAS FIJAS (Registro y Login) – deben ir primero
router.post('/registre', usuariController.registre);
router.post('/login', usuariController.login);

// RUTAS CRUD
router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getUsuaris);

// RUTAS DINÁMICAS CON PARAMETRO ID
router.get('/:id', usuariController.getUsuariById);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
