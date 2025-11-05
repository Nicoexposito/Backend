const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProducte);
router.get('/', productController.getProductes);
router.get('/:id', productController.getProducteById);
router.put('/:id', productController.updateProducte);
router.delete('/:id', productController.deleteProducte);

module.exports = router;
