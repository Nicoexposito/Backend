/*const mongoose = require('mongoose');

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

module.exports = mongoose.model('Producte', producteSchema);*/
const mongoose = require('mongoose');

const producteSchema = new mongoose.Schema({
  // Nombre del producto con traducciones
  name: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  // Equipo de fútbol
  equip: {
    type: String,
    required: true
  },
  // Tipo de equipación con traducciones
  color: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  talla: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL'],
    default: 'M'
  },
  preu: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 100,
    min: [0, "L'estoc no pot ser negatiu"]
  },
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    required: true
  },
  liga: {
    type: String,
    default: 'La Liga'
  },
  marca: {
    type: String,
    default: 'Adidas'
  },
  colorPrincipal: {
    type: String,
    default: 'Blanco'
  },
  descripcio: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

// Índex per millorar cerques per equip i preu
producteSchema.index({ equip: 1, preu: 1 });

module.exports = mongoose.model('Producte', producteSchema);
