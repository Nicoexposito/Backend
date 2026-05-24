const Venta = require('../models/venta');
const Producte = require('../models/product');
const Usuari = require('../models/usuari');

// GET /api/admin/stats — KPIs generals
exports.getStats = async (req, res) => {
  try {
    const [totalProductes, totalUsuaris, totalVendes, ingresosResult] = await Promise.all([
      Producte.countDocuments(),
      Usuari.countDocuments(),
      Venta.countDocuments(),
      Venta.aggregate([
        { $match: { estat: { $in: ['pagat', 'completada', 'enviada', 'entregada'] } } },
        { $group: { _id: null, totalIngressos: { $sum: '$total' } } }
      ])
    ]);

    const totalIngressos = ingresosResult.length > 0 ? ingresosResult[0].totalIngressos : 0;

    // Vendes d'avui
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const vendesToday = await Venta.countDocuments({ createdAt: { $gte: startOfToday } });

    // Nous usuaris aquesta setmana
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const newUsersWeek = await Usuari.countDocuments({ createdAt: { $gte: startOfWeek } });

    res.json({
      status: 'success',
      data: {
        totalProductes,
        totalUsuaris,
        totalVendes,
        totalIngressos: Math.round(totalIngressos * 100) / 100,
        vendesToday,
        newUsersWeek
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET /api/admin/charts/sales-weekly — Vendes per dia (últims 7 dies)
exports.getSalesWeekly = async (req, res) => {
  try {
    const timezone = 'Europe/Madrid';

    // Calcular fa 7 dies a mitjanit UTC
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 6);
    sevenDaysAgo.setUTCHours(0, 0, 0, 0);

    const salesByDay = await Venta.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone }
          },
          count: { $sum: 1 },
          total: { $sum: '$total' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Omplir dies sense vendes
    const labels = [];
    const counts = [];
    const totals = [];
    const dayNames = ['Dg', 'Dl', 'Dm', 'Dc', 'Dj', 'Dv', 'Ds'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setUTCDate(date.getUTCDate() + i);

      // Formatear la fecha en la zona horaria local para coincidir con MongoDB
      const year = date.toLocaleString('en-CA', { timeZone: timezone, year: 'numeric' });
      const month = date.toLocaleString('en-CA', { timeZone: timezone, month: '2-digit' });
      const day = date.toLocaleString('en-CA', { timeZone: timezone, day: '2-digit' });
      const dateStr = `${year}-${month}-${day}`;

      const localDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
      const dayName = dayNames[localDate.getDay()];
      const dayNum = localDate.getDate();

      labels.push(`${dayName} ${dayNum}`);

      const found = salesByDay.find(s => s._id === dateStr);
      counts.push(found ? found.count : 0);
      totals.push(found ? Math.round(found.total * 100) / 100 : 0);
    }

    res.json({
      status: 'success',
      data: { labels, counts, totals }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET /api/admin/charts/sales-status — Distribució per estat de venda
exports.getSalesStatus = async (req, res) => {
  try {
    const statusData = await Venta.aggregate([
      {
        $group: {
          _id: '$estat',
          count: { $sum: 1 },
          total: { $sum: '$total' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const labels = statusData.map(s => s._id);

    const counts = statusData.map(s => s.count);
    const totals = statusData.map(s => Math.round(s.total * 100) / 100);

    res.json({
      status: 'success',
      data: { labels, counts, totals }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
