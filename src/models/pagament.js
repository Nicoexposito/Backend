const mongoose = require('mongoose');

const pagamentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  metode: {
    type: String,
    enum: ['targeta'], // puedes añadir más métodos si luego lo amplías (ex: 'paypal', 'transferencia')
    required: true
  },
  estat: {
    type: String,
    enum: ['acceptat', 'rebutjat', 'pendent'],
    default: 'pendent',
    required: true
  },
  dataPagament: {
    type: Date,
    default: Date.now,
    required: true
  }
}, { timestamps: true });

// Índex per millorar cerques per estat i data
pagamentSchema.index({ estat: 1, dataPagament: -1 });

module.exports = mongoose.model('Pagament', pagamentSchema);
