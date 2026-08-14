// Its only responsibility is:

// Define authentication-related endpoints.
// Forward requests to the appropriate controller.

const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

const authLimiter = require("../middleware/rateLimitMiddleware");

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);

module.exports = router;