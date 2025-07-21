-- FreelanceHub Database Setup Script

USE freelancehub;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'freelancer', 'admin') DEFAULT 'client',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    timeline VARCHAR(50),
    skills_required TEXT,
    experience_level ENUM('entry', 'intermediate', 'expert'),
    client_id INT,
    status ENUM('open', 'in_progress', 'completed', 'cancelled') DEFAULT 'open',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    client_id INT,
    freelancer_id INT,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    freelancer_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Earnings table
CREATE TABLE IF NOT EXISTS earnings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    freelancer_id INT,
    order_id INT,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Insert sample data for testing
INSERT INTO users (firstName, lastName, email, password, role) VALUES
('John', 'Doe', 'john@example.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6u', 'client'),
('Jane', 'Smith', 'jane@example.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6u', 'freelancer'),
('Admin', 'User', 'admin@freelancehub.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6u', 'admin')
ON DUPLICATE KEY UPDATE firstName=firstName;

-- Insert sample projects
INSERT INTO projects (title, description, category, budget_min, budget_max, client_id) VALUES
('Website Design', 'Need a modern website design for my business', 'web-design', 500.00, 2000.00, 1),
('Logo Design', 'Looking for a professional logo design', 'graphic-design', 100.00, 500.00, 1),
('Content Writing', 'Need blog content for my website', 'writing', 200.00, 800.00, 1)
ON DUPLICATE KEY UPDATE title=title;

-- Insert sample portfolio items
INSERT INTO portfolio (freelancer_id, title, description, category) VALUES
(2, 'E-commerce Website', 'Modern e-commerce platform design', 'web-design'),
(2, 'Brand Identity', 'Complete brand identity package', 'graphic-design'),
(2, 'Blog Content', 'SEO-optimized blog content', 'writing')
ON DUPLICATE KEY UPDATE title=title; 