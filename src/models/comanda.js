const mongoose = require('mongoose');

const comandaSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dataComanda: {
    type: Date,
    default: Date.now,
    required: true
  },
  estat: {
    type: String,
    enum: ['pendent', 'enviada', 'entregada', 'cancel·lada'],
    default: 'pendent',
    required: true
  },
  quantitat_total: {
    type: Number,
    required: true,
    min: [0, 'La quantitat total no pot ser negativa']
  }
}, { timestamps: true });

// Índex per millorar cerques per estat i data
comandaSchema.index({ estat: 1, dataComanda: -1 });

module.exports = mongoose.model('Comanda', comandaSchema);
