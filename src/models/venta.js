const mongoose = require('mongoose');

const ventaItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producte',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  quantitat: {
    type: Number,
    required: true,
    min: [1, 'La quantitat ha de ser mínim 1']
  },
  preu: {
    type: Number,
    required: true,
    min: [0, 'El preu no pot ser negatiu']
  },
  talla: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL'],
    default: 'M'
  }
});

const ventaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuari',
    required: true
  },
  items: {
    type: [ventaItemSchema],
    required: true,
    validate: [arr => arr.length > 0, 'La venta ha de tenir almenys un producte']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'El total no pot ser negatiu']
  },
  estat: {
    type: String,
    enum: ['pendent', 'completada', 'enviada', 'entregada', 'cancel·lada'],
    default: 'completada'
  },
  metodePagament: {
    type: String,
    enum: ['targeta', 'paypal', 'transferencia', 'altres'],
    default: 'targeta'
  },
  adreca: {
    carrer: { type: String },
    ciutat: { type: String },
    codiPostal: { type: String },
    pais: { type: String, default: 'Espanya' }
  }
}, { timestamps: true });

// Índexs per millorar cerques
ventaSchema.index({ userId: 1, createdAt: -1 });
ventaSchema.index({ estat: 1 });

module.exports = mongoose.model('Venta', ventaSchema, 'ventas');
