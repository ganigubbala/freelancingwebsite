const pool = require('./db');
exports.getByUser = async (user_id) => {
  // Example: sum of completed orders for a freelancer
  const [rows] = await pool.query(
    `SELECT SUM(p.budgetMax) as total_earned
     FROM orders o
     JOIN projects p ON o.project_id = p.id
     WHERE o.freelancer_id = ? AND o.status = 'completed'`,
    [user_id]
  );
  return rows[0];
};