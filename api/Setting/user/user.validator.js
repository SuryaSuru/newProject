const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required(),
  contactNumber: Joi.string().required(),
  email_address: Joi.string().email().required(),
  password: Joi.string().required(),
  active: Joi.boolean().default(true),
  createdAt: Joi.date(),
  del_status: Joi.string().valid('Live', 'Deleted').default('Live')
});

// Validate the user data
function validateUser(userData) {
  const { error, value } = userSchema.validate(userData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}

// Validate the update data
function validateUpdate(updateData) {
  const { error, value } = userSchema.validate(updateData);
  if (error) {const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}

module.exports = {
  validateUser,
  validateUpdate
};
