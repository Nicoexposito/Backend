const productService = require('../services/productService');

const createProducte = async (req, res) => {
  try {
    const producte = await productService.createProducte(req.body);
    res.status(201).json({ status: 'success', data: producte });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getProductes = async (req, res) => {
  try {
    const productes = await productService.getProductes();
    res.status(200).json({ status: 'success', data: productes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateProducte = async (req, res) => {
  try {
    const producte = await productService.updateProducte(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: producte });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteProducte = async (req, res) => {
  try {
    await productService.deleteProducte(req.params.id);
    res.status(204).json({ status: 'success', message: 'Producte eliminat' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = { createProducte, getProductes, updateProducte, deleteProducte };
