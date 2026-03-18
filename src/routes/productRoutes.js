const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Rutes públiques
router.get('/', productController.getProductes);
router.get('/:id', productController.getProducteById);

// Rutes protegides (només admin)
router.post('/', authMiddleware, roleMiddleware('admin'), productController.createProducte);
router.put('/:id', authMiddleware, roleMiddleware('admin'), productController.updateProducte);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.deleteProducte);

module.exports = router;
