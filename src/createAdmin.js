// Script per crear l'usuari administrador
require('dotenv').config();
const mongoose = require('mongoose');
const Usuari = require('./models/usuari');

const MONGO_URI = process.env.MONGO_URI;

const adminData = {
  nom: 'Nicolas',
  primerCognom: 'Admin',
  segonCognom: '',
  email: 'niexal@gmail.com',
  contrasenya: 'nicolas29',
  telefon: '000000000',
  rol: 'admin',
  estat: 'actiu'
};

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Verificar si l'usuari ja existeix
    const existingUser = await Usuari.findOne({ email: adminData.email });
    if (existingUser) {
      // Si existeix però no és admin, actualitzar a admin
      if (existingUser.rol !== 'admin') {
        existingUser.rol = 'admin';
        existingUser.estat = 'actiu';
        await existingUser.save();
        console.log('🔄 Usuari existent actualitzat a admin:', existingUser.email);
      } else {
        console.log('ℹ️  L\'usuari admin ja existeix:', existingUser.email);
      }
      await mongoose.disconnect();
      process.exit(0);
    }

    // Crear l'admin
    const admin = await Usuari.create(adminData);
    console.log('🎉 Admin creat correctament:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Nom: ${admin.nom} ${admin.primerCognom}`);
    console.log(`   Rol: ${admin.rol}`);
    console.log(`   Estat: ${admin.estat}`);
    console.log(`   ID: ${admin._id}`);

    await mongoose.disconnect();
    console.log('🔌 Desconectat de MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
