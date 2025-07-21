const pool = require('./db');
exports.create = async (msg) => {
  const { sender_id, receiver_id, content } = msg;
  await pool.query(
    'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
    [sender_id, receiver_id, content]
  );
};
exports.getConversation = async (user1, user2) => {
  const [rows] = await pool.query(
    'SELECT * FROM messages WHERE (sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?) ORDER BY created_at ASC',
    [user1, user2, user2, user1]
  );
  return rows;
};