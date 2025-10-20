const mongoose = require('mongoose');

const usuariSchema = new mongoose.Schema({
  rol: {
    type: String,
    enum: ['client', 'admin'], // puedes ampliar si hay más roles
    required: true,
    default: 'client'
  },
  nom: {
    type: String,
    required: true,
    minlength: 2
  },
  primerCognom: {
    type: String,
    required: true,
    minlength: 2
  },
  segonCognom: {
    type: String,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Format d’email no vàlid']
  },
  contrasenya: {
    type: String,
    required: true,
    minlength: 6
  },
  telefon: {
    type: String,
    match: [/^\d{9}$/, 'El telèfon ha de tenir 9 dígits']
  },
  estat: {
    type: String,
    enum: ['actiu', 'inactiu'],
    default: 'inactiu'
  }
}, { timestamps: true });

// Índex per a cerques més ràpides per email
usuariSchema.index({ email: 1 });

module.exports = mongoose.model('Usuari', usuariSchema);
