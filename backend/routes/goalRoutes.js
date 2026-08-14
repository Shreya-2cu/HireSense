const express = require("express");
const router = express.Router();

const {
    createGoal,
    getGoals,
    updateGoalProgress,
    updateGoal,
    deleteGoal,
} = require("../controllers/goalController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createGoal);
router.get("/", protect, getGoals);
router.patch("/:id/progress", protect, updateGoalProgress);
router.patch("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;