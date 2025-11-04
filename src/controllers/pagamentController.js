const pagamentService = require('../services/pagamentService');

// Crear un nou pagament
const createPagament = async (req, res) => {
  try {
    const pagament = await pagamentService.createPagament(req.body);
    res.status(201).json({ status: 'success', data: pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtenir tots els pagaments
const getPagaments = async (req, res) => {
  try {
    const pagaments = await pagamentService.getPagaments();
    res.status(200).json({ status: 'success', data: pagaments });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Actualitzar un pagament per ID
const updatePagament = async (req, res) => {
  try {
    const pagament = await pagamentService.updatePagament(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar un pagament per ID
const deletePagament = async (req, res) => {
  try {
    await pagamentService.deletePagament(req.params.id);
    res.status(204).json({ status: 'success', message: 'Pagament eliminat' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = { createPagament, getPagaments, updatePagament, deletePagament };
