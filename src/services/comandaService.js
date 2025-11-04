const Comanda = require('../models/comanda');

// Crear una nova comanda
const createComanda = async (data) => {
  const comanda = new Comanda(data);
  return await comanda.save();
};

// Obtenir totes les comandes
const getComandes = async () => {
  return await Comanda.find();
};

// Actualitzar una comanda per ID
const updateComanda = async (id, data) => {
  const comanda = await Comanda.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!comanda) throw new Error('Comanda no trobada');
  return comanda;
};

// Eliminar una comanda per ID
const deleteComanda = async (id) => {
  const comanda = await Comanda.findByIdAndDelete(id);
  if (!comanda) throw new Error('Comanda no trobada');
};

module.exports = { createComanda, getComandes, updateComanda, deleteComanda };
