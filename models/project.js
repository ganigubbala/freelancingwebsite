const pool = require('./db');
exports.create = async (project) => {
  const { user_id, title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes } = project;
  await pool.query(
    'INSERT INTO projects (user_id, title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [user_id, title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes]
  );
};
exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM projects');
  return rows;
};
exports.getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
  return rows[0];
};
exports.getByUser = async (user_id) => {
  const [rows] = await pool.query('SELECT * FROM projects WHERE user_id = ?', [user_id]);
  return rows;
};