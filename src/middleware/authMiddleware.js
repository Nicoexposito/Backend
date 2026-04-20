const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'clau_super_secreta';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accés denegat. Token no proporcionat.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Normalizar: el JWT usa 'rol' pero el código espera 'role'
    req.user = {
      id: decoded.id,
      role: decoded.rol || decoded.role
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirat. Utilitza el refresh token.' });
    }
    return res.status(401).json({ message: 'Token no vàlid.' });
  }
};

module.exports = authMiddleware;
