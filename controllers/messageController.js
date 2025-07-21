const Message = require('../models/message');
exports.send = async (req, res) => {
  await Message.create({ ...req.body, sender_id: req.user.id });
  res.json({ success: true });
};
exports.getConversation = async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.getConversation(req.user.id, userId);
  res.json(messages);
};