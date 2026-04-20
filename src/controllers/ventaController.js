const Venta = require('../models/venta');
const Producte = require('../models/product');

// Crear una nova venda (quan es fa una compra)
exports.createVenta = async (req, res) => {
  try {
    const userId = req.user.id; // Obtingut del authMiddleware
    const { items, metodePagament, adreca } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Has d\'afegir almenys un producte.' });
    }

    // Validar productes i calcular total
    let total = 0;
    const ventaItems = [];

    for (const item of items) {
      const producte = await Producte.findById(item.productId);
      if (!producte) {
        return res.status(404).json({ 
          message: `Producte amb ID ${item.productId} no trobat.` 
        });
      }

      // Comprovar stock
      if (producte.stock < item.quantitat) {
        return res.status(400).json({
          message: `Stock insuficient per "${producte.name?.es || producte.equip}". Disponible: ${producte.stock}`
        });
      }

      const preuStr = String(producte.preu).replace('€', '').replace(',', '.').trim();
      const preu = parseFloat(preuStr) || 0;
      total += preu * item.quantitat;

      ventaItems.push({
        productId: producte._id,
        nom: producte.name?.es || producte.equip,
        quantitat: item.quantitat,
        preu: preu,
        talla: item.talla || producte.talla
      });

      // Reduir stock
      producte.stock -= item.quantitat;
      await producte.save();
    }

    // Crear la venta
    const venta = new Venta({
      userId,
      items: ventaItems,
      total: Math.round(total * 100) / 100,
      metodePagament: metodePagament || 'targeta',
      adreca: adreca || {},
      estat: 'pendent'
    });

    await venta.save();

    res.status(201).json({
      status: 'success',
      message: 'Compra realitzada correctament.',
      data: venta
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les vendes de l'usuari autenticat
exports.getMesVendes = async (req, res) => {
  try {
    const userId = req.user.id;
    const vendes = await Venta.find({ userId })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'equip imageSrc preu');

    res.json({
      status: 'success',
      data: vendes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir totes les vendes (només admin)
exports.getAllVendes = async (req, res) => {
  try {
    const vendes = await Venta.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'nom email')
      .populate('items.productId', 'equip imageSrc preu');

    res.json({
      status: 'success',
      total: vendes.length,
      data: vendes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir una venta per ID
exports.getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate('userId', 'nom email')
      .populate('items.productId', 'equip imageSrc preu');

    if (!venta) {
      return res.status(404).json({ message: 'Venta no trobada.' });
    }

    // Comprovar que l'usuari és el propietari o admin
    if (venta.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accés prohibit.' });
    }

    res.json({
      status: 'success',
      data: venta
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualitzar estat d'una venta (només admin)
exports.updateEstatVenta = async (req, res) => {
  try {
    const { estat } = req.body;

    const venta = await Venta.findByIdAndUpdate(
      req.params.id,
      { estat },
      { new: true, runValidators: true }
    );

    if (!venta) {
      return res.status(404).json({ message: 'Venta no trobada.' });
    }

    res.json({
      status: 'success',
      message: `Estat actualitzat a "${estat}".`,
      data: venta
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
