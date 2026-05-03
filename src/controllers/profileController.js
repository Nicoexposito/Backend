const Usuari = require('../models/usuari');
const bcrypt = require('bcrypt');

// GET /api/profile/me
exports.getProfile = async (req, res) => {
  try {
    const usuari = await Usuari.findById(req.user.id).select('-contrasenya');
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat.' });
    }
    res.json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT /api/profile/me
exports.updateProfile = async (req, res) => {
  try {
    const { nom, primerCognom, segonCognom, telefon } = req.body;
    const updateData = {};
    if (nom !== undefined) updateData.nom = nom;
    if (primerCognom !== undefined) updateData.primerCognom = primerCognom;
    if (segonCognom !== undefined) updateData.segonCognom = segonCognom;
    if (telefon !== undefined) updateData.telefon = telefon;

    const usuari = await Usuari.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true
    }).select('-contrasenya');

    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat.' });
    }
    res.json({ status: 'success', message: 'Perfil actualitzat correctament.', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// PUT /api/profile/me/password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Cal proporcionar la contrasenya actual i la nova.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ status: 'error', message: 'La nova contrasenya ha de tenir almenys 6 caràcters.' });
    }

    const usuari = await Usuari.findById(req.user.id);
    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat.' });
    }

    // Verificar contrasenya actual
    const isMatch = await bcrypt.compare(currentPassword, usuari.contrasenya);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'La contrasenya actual és incorrecta.' });
    }

    // Actualitzar (el hook pre-save fa el hash automàticament)
    usuari.contrasenya = newPassword;
    await usuari.save();

    res.json({ status: 'success', message: 'Contrasenya canviada correctament.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT /api/profile/me/avatar
exports.updateAvatar = async (req, res) => {
  try {
    const { imatgePerfil } = req.body;

    if (!imatgePerfil) {
      return res.status(400).json({ status: 'error', message: "Cal proporcionar la imatge." });
    }

    // Validar que sigui base64 i no superi 500KB
    const base64Size = Buffer.byteLength(imatgePerfil, 'utf8');
    if (base64Size > 500 * 1024) {
      return res.status(400).json({ status: 'error', message: "La imatge no pot superar els 500KB." });
    }

    const usuari = await Usuari.findByIdAndUpdate(
      req.user.id,
      { imatgePerfil },
      { new: true }
    ).select('-contrasenya');

    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat.' });
    }

    res.json({ status: 'success', message: 'Imatge de perfil actualitzada.', data: { imatgePerfil: usuari.imatgePerfil } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT /api/profile/me/privacy
exports.updatePrivacy = async (req, res) => {
  try {
    const { mostrarEmail, mostrarTelefon, perfilPublic } = req.body;
    const privacitat = {};
    if (mostrarEmail !== undefined) privacitat['privacitat.mostrarEmail'] = mostrarEmail;
    if (mostrarTelefon !== undefined) privacitat['privacitat.mostrarTelefon'] = mostrarTelefon;
    if (perfilPublic !== undefined) privacitat['privacitat.perfilPublic'] = perfilPublic;

    const usuari = await Usuari.findByIdAndUpdate(
      req.user.id,
      { $set: privacitat },
      { new: true }
    ).select('-contrasenya');

    if (!usuari) {
      return res.status(404).json({ status: 'error', message: 'Usuari no trobat.' });
    }

    res.json({ status: 'success', message: 'Configuració de privacitat actualitzada.', data: { privacitat: usuari.privacitat } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
