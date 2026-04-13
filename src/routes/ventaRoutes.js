const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


module.exports = router;
