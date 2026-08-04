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