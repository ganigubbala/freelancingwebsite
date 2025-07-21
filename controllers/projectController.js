const pool = require('../models/db');

exports.getAllProjects = async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProject = async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!projects.length) return res.status(404).json({ error: 'Project not found' });
    res.json(projects[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProject = async (req, res) => {
  const { title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (user_id, title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes]
    );
    res.json({ 
      success: true, 
      projectId: result.insertId 
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  const { title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes } = req.body;
  try {
    // Check if project exists and belongs to user
    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!projects.length) return res.status(404).json({ error: 'Project not found or unauthorized' });

    await pool.query(
      'UPDATE projects SET title = ?, description = ?, category = ?, budgetMin = ?, budgetMax = ?, timeline = ?, experienceLevel = ?, additionalNotes = ? WHERE id = ?',
      [title, description, category, budgetMin, budgetMax, timeline, experienceLevel, additionalNotes, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // Check if project exists and belongs to user
    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!projects.length) return res.status(404).json({ error: 'Project not found or unauthorized' });

    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects WHERE user_id = ?', [req.params.userId]);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.searchProjects = async (req, res) => {
  try {
    const searchQuery = `%${req.params.query}%`;
    const [projects] = await pool.query(
      'SELECT * FROM projects WHERE title LIKE ? OR description LIKE ? OR category LIKE ?',
      [searchQuery, searchQuery, searchQuery]
    );
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 