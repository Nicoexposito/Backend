// Script para insertar los productos del frontend en MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const Producte = require('./models/product');

const MONGO_URI = process.env.MONGO_URI;

const products = [
    {
        name: {
            en: "Official Real Madrid 25/26 shirt",
            es: "Camiseta oficial Real Madrid 25/26"
        },
        equip: "Real Madrid",
        color: {
            en: "Home kit",
            es: "Primera Equipación"
        },
        talla: "M",
        preu: "120€",
        stock: 100,
        imageSrc: "./img/Real.png",
        imageAlt: "1 Real Madrid.",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Primera equipación"
    },
    {
        name: {
            en: "Official Real Madrid 25/26 shirt",
            es: "Camiseta oficial Real Madrid 25/26"
        },
        equip: "Real Madrid",
        color: {
            en: "Away Kit",
            es: "Segunda Equipación"
        },
        talla: "M",
        preu: "120€",
        stock: 100,
        imageSrc: "./img/Real2.png",
        imageAlt: "2 Real Madrid.",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Segunda equipación"
    },
    {
        name: {
            en: "Official Real Madrid 25/26 shirt",
            es: "Camiseta oficial Real Madrid 25/26"
        },
        equip: "Real Madrid",
        color: {
            en: "Third Kit",
            es: "Tercera Equipación"
        },
        talla: "M",
        preu: "120€",
        stock: 100,
        imageSrc: "./img/Real3.png",
        imageAlt: "3 Real Madrid.",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Tercera equipación"
    },
    {
        name: {
            en: "Official Real Madrid 25/26 shirt",
            es: "Camiseta oficial Real Madrid 25/26"
        },
        equip: "Real Madrid",
        color: {
            en: "Fourth Kit",
            es: "Cuarta Equipación"
        },
        talla: "M",
        preu: "120€",
        stock: 100,
        imageSrc: "./img/Real4.png",
        imageAlt: "4 Real Madrid.",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Cuarta equipación"
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB');

        // Eliminar productos existentes
        await Producte.deleteMany({});
        console.log('Productos anteriores eliminados');

        // Insertar nuevos productos
        const insertedProducts = await Producte.insertMany(products);
        console.log(`${insertedProducts.length} productos insertados correctamente:`);

        insertedProducts.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.name.es} - ${p.color.es} (ID: ${p._id})`);
        });

        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Error al insertar productos:', error);
        process.exit(1);
    }
}

seedProducts();
