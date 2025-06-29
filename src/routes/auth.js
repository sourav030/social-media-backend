const express = require("express");
const {
	validateRequest,
	userRegistrationSchema,
	userLoginSchema,
} = require("../utils/validation");
const { register, login, getProfile } = require("../controllers/auth");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * Authentication routes
 */

// POST /api/auth/register - Register a new user
router.post("/register", validateRequest(userRegistrationSchema), register);

// POST /api/auth/login - Login user
router.post("/login", validateRequest(userLoginSchema), login);

// GET /api/auth/profile - Get current user profile (protected)
router.get("/profile", authenticateToken, getProfile);




module.exports = router;
