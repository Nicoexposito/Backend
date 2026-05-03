const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Totes les rutes d'admin requereixen autenticació + rol admin
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// GET /api/admin/stats — KPIs generals del dashboard
router.get('/stats', adminController.getStats);

// GET /api/admin/charts/sales-weekly — Vendes per dia (últims 7 dies)
router.get('/charts/sales-weekly', adminController.getSalesWeekly);

// GET /api/admin/charts/sales-status — Distribució per estat de venda
router.get('/charts/sales-status', adminController.getSalesStatus);

module.exports = router;
