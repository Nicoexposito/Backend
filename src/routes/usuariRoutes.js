const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

// Crear un nou usuari
router.post('/', usuariController.createUsuari);

// Obtenir tots els usuaris
router.get('/', usuariController.getUsuaris);

// Actualitzar un usuari per ID
router.put('/:id', usuariController.updateUsuari);

// Eliminar un usuari per ID
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
