const Pagament = require('../models/pagament');

// Crear un nou pagament
const createPagament = async (data) => {
  const pagament = new Pagament(data);
  return await pagament.save();
};

// Obtenir tots els pagaments
const getPagaments = async () => {
  return await Pagament.find();
};

// Actualitzar un pagament per ID
const updatePagament = async (id, data) => {
  const pagament = await Pagament.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!pagament) throw new Error('Pagament no trobat');
  return pagament;
};

// Eliminar un pagament per ID
const deletePagament = async (id) => {
  const pagament = await Pagament.findByIdAndDelete(id);
  if (!pagament) throw new Error('Pagament no trobat');
};

module.exports = { createPagament, getPagaments, updatePagament, deletePagament };
