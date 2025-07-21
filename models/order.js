const pool = require('./db');
exports.create = async (order) => {
  const { project_id, freelancer_id, status } = order;
  await pool.query(
    'INSERT INTO orders (project_id, freelancer_id, status) VALUES (?, ?, ?)',
    [project_id, freelancer_id, status]
  );
};
exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM orders');
  return rows;
};
exports.getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
};
exports.getByUser = async (user_id) => {
  const [rows] = await pool.query(
    'SELECT o.* FROM orders o JOIN projects p ON o.project_id = p.id WHERE p.user_id = ?',
    [user_id]
  );
  return rows;
};