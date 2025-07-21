const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

// Get all projects
router.get('/', projectController.getAllProjects);

// Get single project
router.get('/:id', projectController.getProject);

// Protected routes - require authentication
router.use(authController.protect);

// Create new project
router.post('/', projectController.createProject);

// Update project
router.put('/:id', projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

// Get projects by user (for freelancer's portfolio or client's posted projects)
router.get('/user/:userId', projectController.getUserProjects);

// Search projects
router.get('/search/:query', projectController.searchProjects);

module.exports = router; 