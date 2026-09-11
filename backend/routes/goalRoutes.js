const express = require("express");

const router = express.Router();

const {
    createGoal,
    getGoals,
    getGoalSkillGaps,
    updateGoalProgress,
    updateGoal,
    deleteGoal,
    getGoalRoadmapInput,
    generateGoalRoadmap,
} = require("../controllers/goalController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createGoal);

router.get("/", protect, getGoals);

router.get("/:id/skill-gaps", protect, getGoalSkillGaps);

router.patch("/:id/progress", protect, updateGoalProgress);

router.patch("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

router.get(
    "/:id/roadmap-input",
    protect,
    getGoalRoadmapInput
);

router.post(
    "/:id/generate-roadmap",
    protect,
    generateGoalRoadmap
);

module.exports = router;