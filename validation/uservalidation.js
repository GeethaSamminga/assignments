const Joi = require("joi");

// Validation schema for registering a user
const userValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
 
  role: Joi.string().valid("admin", "user").required().messages({
    "any.only": "Role must be 'admin' or 'user'.",
  }),
});

// Validation schema for login
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

module.exports = { userValidationSchema, loginValidationSchema };
