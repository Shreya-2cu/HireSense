const mongoose = require("mongoose");
const Goal = require("../models/Goal");
const Task = require("../models/Task");

const Resume = require("../models/Resume");

const getDashboard = async (req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .limit(2);

        const goals = await Goal.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        const totalTasks = await Task.countDocuments({
            user: req.user.id,
        });

        const completedTasks = await Task.countDocuments({
            user: req.user.id,
            status: "completed",
        });

        const taskCompletionRate =
            totalTasks === 0
                ? 0
                : Math.round((completedTasks / totalTasks) * 100);

        const activeGoals = goals.filter(
            (goal) => goal.status === "active"
        ).length;

        const completedGoals = goals.filter(
            (goal) => goal.status === "completed"
        ).length;

        const totalResumes = await Resume.countDocuments({
            user: req.user.id,
        });

        if (totalResumes === 0) {
            return res.status(200).json({
                totalResumes: 0,
                highestATS: 0,
                averageATS: 0,
                latestATS: 0,
            });
        }
        const highestResume = await Resume.findOne({
            user: req.user.id,
        }).sort({
            atsScore: -1,
        });

        const latestResume = await Resume.findOne({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        const atsHistory = await Resume.find({
            user: req.user.id,
        })
            .sort({
                createdAt: 1,
            })
            .select("atsScore createdAt -_id");

        const latestATS = resumes[0]?.atsScore || 0;
        const previousATS = resumes[1]?.atsScore || 0;

        const atsImprovement =
            resumes.length > 1
                ? latestATS - previousATS
                : 0;

        const skillGapResult = await Resume.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                },
            },
            {
                $unwind: "$missingSkills",
            },
            {
                $group: {
                    _id: "$missingSkills",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
            {
                $limit: 10,
            },
        ]);

        const averageResult = await Resume.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                },
            },
            {
                $group: {
                    _id: null,
                    averageATS: {
                        $avg: "$atsScore",
                    },
                },
            },
        ]);

        const averageATS = averageResult[0]?.averageATS || 0;

        res.status(200).json({
            totalResumes,
            highestATS: highestResume.atsScore,
            averageATS: Number(averageATS.toFixed(2)),
            latestATS,
            previousATS,
            atsImprovement,
            atsHistory,
            skillGaps: skillGapResult,
            activeGoals,
            completedGoals,
            totalTasks,
            completedTasks,
            taskCompletionRate,
            goals: goals.map((goal) => ({
                id: goal._id,
                title: goal.title,
                targetRole: goal.targetRole,
                progress: goal.progress,
                status: goal.status,
            })),
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            message: "Something went wrong.",
        });

    }
};

module.exports = {
    getDashboard,
};