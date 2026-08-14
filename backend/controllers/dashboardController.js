const mongoose = require("mongoose");

const Resume = require("../models/Resume");

const getDashboard = async (req, res) => {
    try {

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
            
        const atsImprovement =
            atsHistory.length > 1
                ? atsHistory[atsHistory.length - 1].atsScore - atsHistory[0].atsScore
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
            latestATS: latestResume.atsScore,
            atsImprovement,
            atsHistory,
            skillGaps: skillGapResult,
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