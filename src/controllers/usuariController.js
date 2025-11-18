const usuariService = require('../services/usuariService');

// REGISTRO
const registre = async (req, res) => {
  try {
    const usuari = await usuariService.registre(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Usuari registrat correctament', // mensaje amigable
      data: {
        id: usuari._id,
        nom: usuari.nom,
        primerCognom: usuari.primerCognom,
        segonCognom: usuari.segonCognom,
        email: usuari.email,
        rol: usuari.rol,
        estat: usuari.estat
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, contrasenya } = req.body;
    const resultat = await usuariService.login(email, contrasenya);

    // Solo devolver mensaje y token, no la contraseña
    res.status(200).json({
      status: 'success',
      message: 'Login correcte', // mensaje amigable
      data: {
        usuari: {
          id: resultat.usuari._id,
          nom: resultat.usuari.nom,
          primerCognom: resultat.usuari.primerCognom,
          email: resultat.usuari.email,
          rol: resultat.usuari.rol
        },
        token: resultat.token
      }
    });
  } catch (error) {
    res.status(401).json({ status: 'error', message: error.message });
  }
};

// CRUD (sin cambios)
const createUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.createUsuari(req.body);
    res.status(201).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getUsuaris = async (req, res) => {
  try {
    const usuaris = await usuariService.getUsuaris();
    res.status(200).json({ status: 'success', data: usuaris });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getUsuariById = async (req, res) => {
  try {
    const usuari = await usuariService.getUsuariById(req.params.id);
    res.status(200).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const updateUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.updateUsuari(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteUsuari = async (req, res) => {
  try {
    await usuariService.deleteUsuari(req.params.id);
    res.status(204).json({ status: 'success', message: 'Usuari eliminat' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  registre,
  login,
  createUsuari,
  getUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari
};
