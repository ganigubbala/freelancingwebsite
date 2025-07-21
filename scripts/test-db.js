require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1', // Use IP instead of localhost
            user: 'root',
            password: '',
            database: 'freelancehub',
            port: 3306
        });

        console.log('Successfully connected to MySQL!');
        
        // Test query
        const [rows] = await connection.query('SELECT 1');
        console.log('Test query successful:', rows);

        await connection.end();
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

testConnection(); 