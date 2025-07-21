#!/bin/bash

# Create necessary directories
mkdir -p uploads
mkdir -p logs

# Install dependencies
npm install

# Initialize database
node scripts/init-db.js

echo "Setup completed! You can now start the server with 'npm run dev'" 