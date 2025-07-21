const Portfolio = require('../models/portfolio');
exports.create = async (req, res) => {
  await Portfolio.create({ ...req.body, user_id: req.user.id });
  res.json({ success: true });
};
exports.getByUser = async (req, res) => {
  const items = await Portfolio.getByUser(req.user.id);
  res.json(items);
};