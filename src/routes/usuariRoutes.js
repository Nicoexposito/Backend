const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const usuariController = require('../controllers/usuariController');

// -----------------
// RUTAS FIJAS: Registro y Login
// -----------------
router.post('/registre', usuariController.registre);
router.post('/login', usuariController.login);

// -----------------
// CRUD GENERAL
// -----------------
router.post('/', usuariController.createUsuari);
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

router.get('/:id', usuariController.getUsuariById);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;
