const Earning = require('../models/earning');
exports.getEarnings = async (req, res) => {
  const earnings = await Earning.getByUser(req.user.id);
  res.json(earnings);
};