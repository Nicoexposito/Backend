const usuariService = require('../services/usuariService');

// Crear un nou usuari
const createUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.createUsuari(req.body);
    res.status(201).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Obtenir tots els usuaris
const getUsuaris = async (req, res) => {
  try {
    const usuaris = await usuariService.getUsuaris();
    res.status(200).json({ status: 'success', data: usuaris });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Actualitzar un usuari per ID
const updateUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.updateUsuari(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// Eliminar un usuari per ID
const deleteUsuari = async (req, res) => {
  try {
    await usuariService.deleteUsuari(req.params.id);
    res.status(204).json({ status: 'success', message: 'Usuari eliminat' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = { createUsuari, getUsuaris, updateUsuari, deleteUsuari };
