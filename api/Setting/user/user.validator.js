const Joi = require('joi');
const validator = require('validator'); // Import validator module

const userSchema = Joi.object({
  username: Joi.string().required(),
  contactNumber: Joi.string().required(),
  email_address: Joi.string().email().required(),
  password: Joi.string().required(),
  active: Joi.boolean().default(true),
  createdAt: Joi.date()
});

// Validate the user data
function validateUser(userData) {
  return userSchema.validate(userData);
}

module.exports = {
  validateUser
};
