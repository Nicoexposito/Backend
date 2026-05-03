require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const usuariRoutes = require('./routes/usuariRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');


const app = express();

// Middleware
app.use(cors());
app.use('/api/checkout', checkoutRoutes);
app.use(express.json({ limit: '2mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.get('/', (req, res) => res.send('API Ecommerce en marxa'));

app.use('/api/products', productRoutes);
app.use('/api/usuari', usuariRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));