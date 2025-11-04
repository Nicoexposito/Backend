const comandaService = require('../services/comandaService');

// Crear una nova comanda
const createComanda = async (req, res) => {
  try {
    const comanda = await comandaService.createComanda(req.body);
    res.status(201).json({ status: 'success', data: comanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtenir totes les comandes
const getComandes = async (req, res) => {
  try {
    const comandes = await comandaService.getComandes();
    res.status(200).json({ status: 'success', data: comandes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Actualitzar una comanda per ID
const updateComanda = async (req, res) => {
  try {
    const comanda = await comandaService.updateComanda(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: comanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar una comanda per ID
const deleteComanda = async (req, res) => {
  try {
    await comandaService.deleteComanda(req.params.id);
    res.status(204).json({ status: 'success', message: 'Comanda eliminada' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = { createComanda, getComandes, updateComanda, deleteComanda };
