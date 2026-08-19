const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        goal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goal",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        skill: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;