const User = require('../models/usuari');
const RefreshToken = require('../models/refreshToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshsecretkey';

// Register
exports.register = async (req, res) => {
  try {
    const { nom, email, contrasenya, rol } = req.body;

    // Comprobar si el usuario existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este email ya existe.' });
    }

    // Crear usuario
    const user = new User({
      nom,
      primerCognom: req.body.primerCognom || 'No indicat',
      email,
      contrasenya,
      rol: rol || 'client'
    });

    await user.save();

    res.status(201).json({
      message: 'Usuario registrado correctamente.'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOgin
exports.login = async (req, res) => {
  try {
    const { email, contrasenya } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Dades incorrectes' });
    }

    // Comparar contrasenya
    const isMatch = await bcrypt.compare(contrasenya, user.contrasenya);
    if (!isMatch) {
      return res.status(400).json({ message: 'Dades incorrectes' });
    }

    // 15 minuts
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.rol
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    // 7 dies
    const refreshToken = jwt.sign(
      { id: user._id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Guardar refresh token
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dies
    });

    res.json({
      message: 'Login correcte',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.rol
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Refresh token
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token requerit.' });
    }

    // Buscar el refresh token a la base de dades
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(403).json({ message: 'Refresh token no vàlid o ja utilitzat.' });
    }

    // Verificar token
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        // Si el token ha expirat, eliminar-lo
        await RefreshToken.deleteOne({ token: refreshToken });
        return res.status(403).json({ message: 'Refresh token expirat.' });
      }

      // Buscar l'usuari per generar un nou access token amb el rol actual
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuari no trobat.' });
      }

      // Generar un nou access token
      const newAccessToken = jwt.sign(
        {
          id: user._id,
          role: user.rol
        },
        JWT_SECRET,
        { expiresIn: '15m' }
      );

      res.json({
        accessToken: newAccessToken
      });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGOUT
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token requerit.' });
    }

    // Eliminar el refresh token de la base de dades
    const result = await RefreshToken.deleteOne({ token: refreshToken });

    if (result.deletedCount === 0) {
      return res.status(400).json({ message: 'Refresh token no trobat.' });
    }

    res.json({ message: 'Logout correcte. Sessió tancada.' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};