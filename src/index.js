require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const usuariRoutes = require('./routes/usuariRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();
app.get('/', (req, res) => res.send('API Ecommerce en marxa '));
app.use('/api/products', productRoutes);
app.use('/api/usuari', usuariRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));