const mongoose = require('mongoose');

const producteSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  equip: {
    type: String,
    required: true // nombre del equipo de fútbol
  },
  talla: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL'],
    required: true
  },
  preu: {
    type: Number,
    required: true,
    min: [0, 'El preu no pot ser negatiu']
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'L’estoc no pot ser negatiu']
  },
  imatge: {
    type: String,
    required: false
  },
  descripcio: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

// Índex per millorar cerques per talla i preu
producteSchema.index({ talla: 1, preu: 1 });

module.exports = mongoose.model('Producte', producteSchema);
