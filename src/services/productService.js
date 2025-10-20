const Producte = require('../models/product');

const createProducte = async (producteData) => {
  const nouProducte = new Producte(producteData);
  return await nouProducte.save();
};

const getProductes = async () => {
  return await Producte.find();
};

const updateProducte = async (id, dades) => {
  return await Producte.findByIdAndUpdate(id, dades, { new: true });
};

const deleteProducte = async (id) => {
  return await Producte.findByIdAndDelete(id);
};

module.exports = { createProducte, getProductes, updateProducte, deleteProducte };
