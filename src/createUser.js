// Script para crear un usuario en MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const Usuari = require('./models/usuari');

const MONGO_URI = process.env.MONGO_URI;

const nuevoUsuario = {
    nom: 'Nico',
    primerCognom: 'Exal',
    segonCognom: '',
    email: 'niexal@jviladoms.cat',
    contrasenya: 'nico12345',
    telefon: '123456789',
    rol: 'client',
    estat: 'actiu'
};

async function createUser() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB');

        // Verificar si el usuario ya existe
        const existingUser = await Usuari.findOne({ email: nuevoUsuario.email });
        if (existingUser) {
            console.log('El usuario ya existe:', existingUser.email);
            await mongoose.disconnect();
            process.exit(0);
        }

        // Crear usuario
        const usuario = await Usuari.create(nuevoUsuario);
        console.log('Usuario creado correctamente:');
        console.log(`  Email: ${usuario.email}`);
        console.log(`  Nombre: ${usuario.nom} ${usuario.primerCognom}`);
        console.log(`  Rol: ${usuario.rol}`);
        console.log(`  Estado: ${usuario.estat}`);
        console.log(`  ID: ${usuario._id}`);

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        process.exit(1);
    }
}

createUser();
