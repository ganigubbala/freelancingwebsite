const Joi = require('joi');

// User validation schemas
const userSchemas = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    role: Joi.string().valid('freelancer', 'client').required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  update: Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    currentPassword: Joi.string(),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
  })
};

// Project validation schemas
const projectSchemas = {
  create: Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(20).max(1000).required(),
    budget: Joi.number().min(0).required(),
    deadline: Joi.date().greater('now').required(),
    skills: Joi.array().items(Joi.string()).min(1).required()
  }),

  update: Joi.object({
    title: Joi.string().min(5).max(100),
    description: Joi.string().min(20).max(1000),
    budget: Joi.number().min(0),
    deadline: Joi.date().greater('now'),
    skills: Joi.array().items(Joi.string()).min(1),
    status: Joi.string().valid('open', 'in-progress', 'completed', 'cancelled')
  })
};

// Order validation schemas
const orderSchemas = {
  create: Joi.object({
    projectId: Joi.number().required(),
    description: Joi.string().min(20).max(500).required(),
    amount: Joi.number().min(0).required(),
    deliveryDate: Joi.date().greater('now').required()
  }),

  update: Joi.object({
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'completed').required(),
    review: Joi.string().min(10).max(500),
    rating: Joi.number().min(1).max(5)
  })
};

// Message validation schemas
const messageSchemas = {
  create: Joi.object({
    receiverId: Joi.number().required(),
    content: Joi.string().min(1).max(1000).required(),
    projectId: Joi.number()
  })
};

module.exports = {
  userSchemas,
  projectSchemas,
  orderSchemas,
  messageSchemas
}; 