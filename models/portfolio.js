const pool = require('./db');
exports.create = async (portfolio) => {
  const { user_id, title, description, image } = portfolio;
  await pool.query(
    'INSERT INTO portfolio (user_id, title, description, image) VALUES (?, ?, ?, ?)',
    [user_id, title, description, image]
  );
};
exports.getByUser = async (user_id) => {
  const [rows] = await pool.query('SELECT * FROM portfolio WHERE user_id = ?', [user_id]);
  return rows;
};