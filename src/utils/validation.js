const Joi = require("joi");

/**
 * Validation schemas for API endpoints
 */

const userRegistrationSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	full_name: Joi.string().min(1).max(100).required(),
});

const userLoginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

const createPostSchema = Joi.object({
	content: Joi.string().min(1).max(1000).required(),
	media_url: Joi.string().uri().optional(),
	comments_enabled: Joi.boolean().default(true),
});

/**
 * Middleware to validate request body against schema
 * @param {Joi.Schema} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
const validateRequest = (schema) => {
	return (req, res, next) => {
		const { error, value } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({
				error: "Validation failed",
				details: error.details.map((detail) => detail.message),
			});
		}

		req.validatedData = value;
		next();
	};
};

const updatePostSchema = {
  type: "object",
  properties: {
    content: { type: "string" },
    media_url: { type: "string", format: "uri" },
    comments_enabled: { type: "boolean" },
  },
  required: [],
  additionalProperties: false,
};


module.exports = {
	userRegistrationSchema,
	userLoginSchema,
	createPostSchema,
	validateRequest,
	updatePostSchema,
	validateRequest
};
