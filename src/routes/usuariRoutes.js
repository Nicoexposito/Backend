const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

// Registre i Login
router.post('/registre', usuariController.registre);
router.post('/login', usuariController.login);

// CRUD
router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getUsuaris);
router.get('/:id', usuariController.getUsuariById);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
