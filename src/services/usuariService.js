const Usuari = require('../models/usuari');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "clau_super_secreta";

// Crear un usuari nou (REGISTRE)
const registre = async (data) => {
  const existeix = await Usuari.findOne({ email: data.email });
  if (existeix) throw new Error("Aquest email ja està registrat");

  const usuari = new Usuari(data);
  await usuari.save();
  return usuari;
};

// LOGIN
const login = async (email, contrasenya) => {
  const usuari = await Usuari.findOne({ email });
  if (!usuari) throw new Error("Credencials incorrectes");

  const valid = await bcrypt.compare(contrasenya, usuari.contrasenya);
  if (!valid) throw new Error("Credencials incorrectes");

  const token = jwt.sign({ id: usuari._id, rol: usuari.rol }, JWT_SECRET, {
    expiresIn: "7d"
  });

  return { usuari, token };
};

// CRUD
const createUsuari = async (data) => {
  const usuari = new Usuari(data);
  return await usuari.save();
};

const getUsuaris = async () => {
  return await Usuari.find();
};

const getUsuariById = async (id) => {
  const usuari = await Usuari.findById(id);
  if (!usuari) throw new Error('Usuari no trobat');
  return usuari;
};

const updateUsuari = async (id, data) => {
  const usuari = await Usuari.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!usuari) throw new Error('Usuari no trobat');
  return usuari;
};

const deleteUsuari = async (id) => {
  const usuari = await Usuari.findByIdAndDelete(id);
  if (!usuari) throw new Error('Usuari no trobat');
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
