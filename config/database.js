const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost', // Try localhost instead of 127.0.0.1
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'mySecret123',
  database: process.env.DB_NAME || 'freelancehub',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add socket path for macOS
  socketPath: '/tmp/mysql.sock'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    // Try without socket path
    const fallbackConfig = {
      host: 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'mySecret123',
      database: process.env.DB_NAME || 'freelancehub',
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
    
    const fallbackPool = mysql.createPool(fallbackConfig);
    fallbackPool.getConnection()
      .then(conn => {
        console.log('Successfully connected using fallback configuration.');
        conn.release();
        // Replace the main pool with fallback pool
        module.exports = fallbackPool;
      })
      .catch(fallbackErr => {
        console.error('Fallback connection also failed:', fallbackErr.message);
      });
  });

module.exports = pool; 