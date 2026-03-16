//const User = require('../models/User');
const User = require('../models/usuari');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // comprobar si el usuario existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este email ya existe.' });
    }

    // hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // crear usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'client'
    });

    await user.save();

    res.status(201).json({
      message: 'Usuario registrado correctamente.'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Contraseñas incorrectas' });
    }

    // comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseñas incorrectas' });
    }

    // generar token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "15m" }
    );

    res.json({
      message: 'Login correcto',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};