const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const helpers = {
  /**
   * Hash password
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   */
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  /**
   * Compare password with hash
   * @param {string} password - Plain text password
   * @param {string} hash - Hashed password
   * @returns {Promise<boolean>} True if match
   */
  comparePassword: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },

  /**
   * Generate JWT token
   * @param {Object} payload - Token payload
   * @returns {string} JWT token
   */
  generateToken: (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  },

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Object} Decoded token payload
   */
  verifyToken: (token) => {
    return jwt.verify(token, config.jwt.secret);
  },

  /**
   * Format error response
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Error response object
   */
  errorResponse: (message, statusCode = 500) => {
    return {
      status: 'error',
      statusCode,
      message
    };
  },

  /**
   * Format success response
   * @param {*} data - Response data
   * @param {string} message - Success message
   * @returns {Object} Success response object
   */
  successResponse: (data, message = 'Success') => {
    return {
      status: 'success',
      message,
      data
    };
  },

  /**
   * Validate file type
   * @param {string} mimetype - File mimetype
   * @returns {boolean} True if valid
   */
  isValidFileType: (mimetype) => {
    return config.upload.allowedTypes.includes(mimetype);
  },

  /**
   * Generate random string
   * @param {number} length - String length
   * @returns {string} Random string
   */
  generateRandomString: (length = 10) => {
    return Math.random().toString(36).substring(2, length + 2);
  }
};

module.exports = helpers; 