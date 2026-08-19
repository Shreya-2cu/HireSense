const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasks,
    updateTaskStatus,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

router.post("/:goalId", protect, createTask);
router.get("/:goalId", protect, getTasks);
router.patch("/:taskId/status", protect, updateTaskStatus);
router.patch("/:taskId", protect, updateTask);
router.delete("/:taskId", protect, deleteTask);

module.exports = router;