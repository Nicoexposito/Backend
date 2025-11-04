const express = require('express');
const router = express.Router();
const pagamentController = require('../controllers/pagamentController');

// Crear un nou pagament
router.post('/', pagamentController.createPagament);

// Obtenir tots els pagaments
router.get('/', pagamentController.getPagaments);

// Actualitzar un pagament per ID
router.put('/:id', pagamentController.updatePagament);

// Eliminar un pagament per ID
router.delete('/:id', pagamentController.deletePagament);

module.exports = router;
