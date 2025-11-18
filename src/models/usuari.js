const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuariSchema = new mongoose.Schema({
  nom: { type: String, required: true, minlength: 2 },
  primerCognom: { type: String, required: true, minlength: 2 },
  segonCognom: { type: String, minlength: 2 },

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

  rol: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },

  estat: {
    type: String,
    enum: ['actiu', 'inactiu'],
    default: 'inactiu'
  }
}, { timestamps: true });

usuariSchema.index({ email: 1 });

// Hashing abans de guardar
usuariSchema.pre('save', async function (next) {
  if (!this.isModified('contrasenya')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contrasenya = await bcrypt.hash(this.contrasenya, salt);
  next();
});

module.exports = mongoose.model('Usuari', usuariSchema);
