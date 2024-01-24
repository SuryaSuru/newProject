const Joi = require("joi");

// Define the validation schema
const supportSchema = Joi.object({
  createdAt: Joi.date().label("Created At"),
  description: Joi.string().trim().required().label("Description"),
  user_id: Joi.string().required().label("User ID")
});

// Validate the support data
function validateSupport(supportData) {
  return supportSchema.validate(supportData);
}

function validateUpdate(updateData) {
  return supportSchema.validate(updateData);
}

module.exports = {
  validateSupport,
  validateUpdate,
};
