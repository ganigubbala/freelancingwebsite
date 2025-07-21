const User = require('../models/user');
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};
exports.updateProfile = async (req, res) => {
  await User.update(req.user.id, req.body);
  res.json({ success: true });
};