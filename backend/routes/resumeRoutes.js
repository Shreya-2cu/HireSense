const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    analyzeResume,
    getResumeHistory,
    getResumeById,
    deleteResume,
} = require("../controllers/resumeController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post(
    "/analyze",
    protect,
    upload.single("resume"),
    analyzeResume
);
router.get(
    "/history",
    protect,
    getResumeHistory
);
router.get(
    "/:id",
    protect,
    getResumeById
);
router.delete(
    "/:id",
    protect,
    deleteResume
);

module.exports = router;