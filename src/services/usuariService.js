const Usuari = require('../models/usuari');

// Crear un usuari nou
const createUsuari = async (data) => {
  const usuari = new Usuari(data);
  return await usuari.save();
};

// Obtenir tots els usuaris
const getUsuaris = async () => {
  return await Usuari.find();
};

// Actualitzar usuari per ID
const updateUsuari = async (id, data) => {
  const usuari = await Usuari.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!usuari) throw new Error('Usuari no trobat');
  return usuari;
};

// Eliminar usuari per ID
const deleteUsuari = async (id) => {
  const usuari = await Usuari.findByIdAndDelete(id);
  if (!usuari) throw new Error('Usuari no trobat');
};

module.exports = { createUsuari, getUsuaris, updateUsuari, deleteUsuari };
