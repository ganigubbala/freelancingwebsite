const pool = require('./db');
exports.findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
exports.create = async (user) => {
  const { firstName, lastName, email, password, role } = user;
  await pool.query(
    'INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, email, password, role]
  );
};
exports.findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};
exports.update = async (id, data) => {
  const { firstName, lastName, email } = data;
  await pool.query(
    'UPDATE users SET firstName=?, lastName=?, email=? WHERE id=?',
    [firstName, lastName, email, id]
  );
}; 