// Its only responsibility is:

// Define authentication-related endpoints.
// Forward requests to the appropriate controller.

const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;