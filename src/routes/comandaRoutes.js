const express = require('express');
const router = express.Router();
const comandaController = require('../controllers/comandaController');

// Crear una nova comanda
router.post('/', comandaController.createComanda);

// Obtenir totes les comandes
router.get('/', comandaController.getComandes);

// Actualitzar una comanda per ID
router.put('/:id', comandaController.updateComanda);

// Eliminar una comanda per ID
router.delete('/:id', comandaController.deleteComanda);

module.exports = router;
