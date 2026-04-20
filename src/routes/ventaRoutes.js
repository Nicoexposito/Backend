const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// POST /api/ventas — Crear una nova venda (usuari autenticat)
router.post('/', authMiddleware, ventaController.createVenta);

// GET /api/ventas — Obtenir les vendes de l'usuari autenticat
router.get('/', authMiddleware, ventaController.getMesVendes);

// GET /api/ventas/all — Obtenir totes les vendes (només admin)
router.get('/all', authMiddleware, roleMiddleware('admin'), ventaController.getAllVendes);

// GET /api/ventas/:id — Obtenir una venta per ID
router.get('/:id', authMiddleware, ventaController.getVentaById);

// PUT /api/ventas/:id/estat — Actualitzar estat d'una venta (només admin)
router.put('/:id/estat', authMiddleware, roleMiddleware('admin'), ventaController.updateEstatVenta);

module.exports = router;
