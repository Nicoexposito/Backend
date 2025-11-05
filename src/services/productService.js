const Producte = require('../models/product');

// Crear un producte
const createProducte = async (producteData) => {
  const nouProducte = new Producte(producteData);
  return await nouProducte.save();
};

// Obtener todos los productes
const getProductes = async () => {
  return await Producte.find();
};

// ✅ Obtener un producte por ID
const getProducteById = async (id) => {
  return await Producte.findById(id);
};

// Actualizar un producte
const updateProducte = async (id, dades) => {
  return await Producte.findByIdAndUpdate(id, dades, { new: true });
};

// Eliminar un producte
const deleteProducte = async (id) => {
  return await Producte.findByIdAndDelete(id);
};

module.exports = { 
  createProducte, 
  getProductes, 
  getProducteById,  
  updateProducte, 
  deleteProducte 
};
