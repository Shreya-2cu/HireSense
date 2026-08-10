require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const protect = require("./middleware/authMiddleware");

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Protected Route
app.get("/api/test", protect, (req, res) => {
    res.json(req.user);
});

// Health Check
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Global Error Handler
app.use((error, req, res, next) => {
    console.error("Server Error:", error);

    if (error.message === "Only PDF files are allowed.") {
        return res.status(400).json({
            message: error.message,
        });
    }

    res.status(500).json({
        message: "Something went wrong.",
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
};

startServer();