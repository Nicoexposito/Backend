const Usuari = require('../models/usuari');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || "clau_super_secreta";

// REGISTRO
const registre = async (data) => {
  // Verificar si el email ya existe
  const existeix = await Usuari.findOne({ email: data.email });
  if (existeix) throw new Error("Aquest email ja està registrat");

  // Crear nuevo usuario (con hashing de contraseña automático en el modelo)
  const usuari = new Usuari(data);
  await usuari.save();

  return usuari;
};

// LOGIN
const login = async (email, contrasenya) => {
  const usuari = await Usuari.findOne({ email });
  if (!usuari) throw new Error("Credencials incorrectes");

  // Comparar la contraseña
  const valid = await bcrypt.compare(contrasenya, usuari.contrasenya);
  if (!valid) throw new Error("Credencials incorrectes");

  // Generar JWT
  const token = jwt.sign({ id: usuari._id, rol: usuari.rol }, JWT_SECRET, {
    expiresIn: "7d"
  });

  return { usuari, token };
};

// CRUD

// Crear usuario (sin registro)
const createUsuari = async (data) => {
  const usuari = new Usuari(data);
  return await usuari.save();
};

// Listar todos los usuarios
const getUsuaris = async () => {
  return await Usuari.find().select('-contrasenya'); // No devolver contraseñas
};

// Obtener usuario por ID
const getUsuariById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID no vàlid');
  const usuari = await Usuari.findById(id).select('-contrasenya');
  if (!usuari) throw new Error('Usuari no trobat');
  return usuari;
};

// Actualizar usuario
const updateUsuari = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID no vàlid');
  const usuari = await Usuari.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!usuari) throw new Error('Usuari no trobat');
  return usuari;
};

// Eliminar usuario
const deleteUsuari = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID no vàlid');
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
