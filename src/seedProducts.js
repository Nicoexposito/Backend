// Script para insertar TODOS los productos del frontend en MongoDB
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Producte = require('./models/product');

const MONGO_URI = process.env.MONGO_URI;

const products = [
    // ========== REAL MADRID ==========
    {
        name: { en: "Official Real Madrid 25/26 shirt", es: "Camiseta oficial Real Madrid 25/26" },
        equip: "Real Madrid",
        color: { en: "Home Kit", es: "Primera Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/Real.png", imageAlt: "1 Real Madrid.",
        liga: "La Liga", marca: "Adidas", colorPrincipal: "Blanco",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Primera equipación"
    },
    {
        name: { en: "Official Real Madrid 25/26 shirt", es: "Camiseta oficial Real Madrid 25/26" },
        equip: "Real Madrid",
        color: { en: "Away Kit", es: "Segunda Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/Real2.png", imageAlt: "2 Real Madrid.",
        liga: "La Liga", marca: "Adidas", colorPrincipal: "Azul Marino",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Segunda equipación"
    },
    {
        name: { en: "Official Real Madrid 25/26 shirt", es: "Camiseta oficial Real Madrid 25/26" },
        equip: "Real Madrid",
        color: { en: "Third Kit", es: "Tercera Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/Real3.png", imageAlt: "3 Real Madrid.",
        liga: "La Liga", marca: "Adidas", colorPrincipal: "Negro",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Tercera equipación"
    },
    {
        name: { en: "Official Real Madrid 25/26 shirt", es: "Camiseta oficial Real Madrid 25/26" },
        equip: "Real Madrid",
        color: { en: "Fourth Kit", es: "Cuarta Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/Real4.png", imageAlt: "4 Real Madrid.",
        liga: "La Liga", marca: "Adidas", colorPrincipal: "Naranja",
        descripcio: "Camiseta oficial del Real Madrid temporada 25/26 - Cuarta equipación"
    },

    // ========== FC BARCELONA ==========
    {
        name: { en: "FC Barcelona Home Kit 24/25", es: "Camiseta 1ª Equipación FC Barcelona 24/25" },
        equip: "FC Barcelona",
        color: { en: "Home Kit", es: "Primera Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/bcn1.png", imageAlt: "1 FC Barcelona.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Azulkrana",
        descripcio: "Camiseta oficial del FC Barcelona para la temporada 24/25."
    },
    {
        name: { en: "FC Barcelona Away Kit 24/25", es: "Camiseta 2ª Equipación FC Barcelona 24/25" },
        equip: "FC Barcelona",
        color: { en: "Away Kit", es: "Segunda Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/bcn2.png", imageAlt: "2 FC Barcelona.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Amarillo",
        descripcio: "Segunda equipación del FC Barcelona."
    },
    {
        name: { en: "FC Barcelona Third Kit 24/25", es: "Camiseta 3ª Equipación FC Barcelona 24/25" },
        equip: "FC Barcelona",
        color: { en: "Third Kit", es: "Tercera Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/bcn3.png", imageAlt: "3 FC Barcelona.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Verde",
        descripcio: "Tercera equipación del FC Barcelona."
    },
    {
        name: { en: "FC Barcelona Fourth Kit 24/25", es: "Camiseta 4ª Equipación FC Barcelona 24/25" },
        equip: "FC Barcelona",
        color: { en: "Fourth Kit", es: "Cuarta Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/bcn4.png", imageAlt: "4 FC Barcelona.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Rosa",
        descripcio: "Cuarta equipación del FC Barcelona."
    },

    // ========== FC ANDORRA ==========
    {
        name: { en: "FC Andorra Home Kit", es: "Camiseta 1ª Equipación FC Andorra" },
        equip: "FC Andorra",
        color: { en: "Home Kit", es: "Primera Equipación" },
        talla: "M", preu: "80€", stock: 100,
        imageSrc: "./img/and1.png", imageAlt: "1 FC Andorra.",
        liga: "Segunda División", marca: "Kappa", colorPrincipal: "Azul",
        descripcio: "Camiseta oficial del FC Andorra."
    },
    {
        name: { en: "FC Andorra Away Kit", es: "Camiseta 2ª Equipación FC Andorra" },
        equip: "FC Andorra",
        color: { en: "Away Kit", es: "Segunda Equipación" },
        talla: "M", preu: "80€", stock: 100,
        imageSrc: "./img/and2.png", imageAlt: "2 FC Andorra.",
        liga: "Segunda División", marca: "Kappa", colorPrincipal: "Blanco",
        descripcio: "Segunda equipación del FC Andorra."
    },
    {
        name: { en: "FC Andorra Third Kit", es: "Camiseta 3ª Equipación FC Andorra" },
        equip: "FC Andorra",
        color: { en: "Third Kit", es: "Tercera Equipación" },
        talla: "M", preu: "80€", stock: 100,
        imageSrc: "./img/and3.png", imageAlt: "3 FC Andorra.",
        liga: "Segunda División", marca: "Kappa", colorPrincipal: "Rojo",
        descripcio: "Tercera equipación del FC Andorra."
    },

    // ========== ATLÉTICO DE MADRID ==========
    {
        name: { en: "Atlético de Madrid Home Kit", es: "Camiseta 1ª Equipación Atlético de Madrid" },
        equip: "Atlético de Madrid",
        color: { en: "Home Kit", es: "Primera Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/atm1.png", imageAlt: "1 Atlético de Madrid.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Rojo",
        descripcio: "Camiseta oficial del Atlético de Madrid."
    },
    {
        name: { en: "Atlético de Madrid Away Kit", es: "Camiseta 2ª Equipación Atlético de Madrid" },
        equip: "Atlético de Madrid",
        color: { en: "Away Kit", es: "Segunda Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/atm2.png", imageAlt: "2 Atlético de Madrid.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Azul",
        descripcio: "Segunda equipación del Atlético de Madrid."
    },
    {
        name: { en: "Atlético de Madrid Third Kit", es: "Camiseta 3ª Equipación Atlético de Madrid" },
        equip: "Atlético de Madrid",
        color: { en: "Third Kit", es: "Tercera Equipación" },
        talla: "M", preu: "120€", stock: 100,
        imageSrc: "./img/atm3.png", imageAlt: "3 Atlético de Madrid.",
        liga: "La Liga", marca: "Nike", colorPrincipal: "Verde",
        descripcio: "Tercera equipación del Atlético de Madrid."
    },

    // ========== CE SABADELL ==========
    {
        name: { en: "CE Sabadell Home Kit", es: "Camiseta 1ª Equipación CE Sabadell" },
        equip: "CE Sabadell",
        color: { en: "Home Kit", es: "Primera Equipación" },
        talla: "M", preu: "70€", stock: 100,
        imageSrc: "./img/sbd1.png", imageAlt: "1 CE Sabadell.",
        liga: "Primera Federación", marca: "Joma", colorPrincipal: "Azul",
        descripcio: "Camiseta oficial del CE Sabadell."
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
            console.log(`  ${i + 1}. ${p.name.es} - ${p.color.es} | ${p.marca} | ${p.colorPrincipal} (ID: ${p._id})`);
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
