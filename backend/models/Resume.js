const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
            trim: true,
        },

        atsScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        summary: {
            type: String,
            required: true,
        },

        skills: [
            {
                type: String,
            },
        ],

        missingSkills: [
            {
                type: String,
            },
        ],

        strengths: [
            {
                type: String,
            },
        ],

        improvements: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;