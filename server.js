const path    = require('path');
const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3000;

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// 1) serve static HTML/JS/CSS from current dir
app.use(express.static(__dirname));

// 2) sample API route
app.get('/api/status', (_req, res) => {
  res.json({ok: true, time: new Date()});
});

// 3) catch-all for SPA routing (optional)
app.get('*', (_req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).send('Error loading page');
  }
});

// Add error handling for server startup
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
});
