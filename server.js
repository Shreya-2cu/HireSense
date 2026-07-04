const express = require("express");  // this has installed the express libraries 

const app = express(); // this creates our express application 

app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.post("/analyze-resume", (req, res) =>
{
    res.json({
        message: "Resume received Successfully"
    });
});

app.listen(PORT, () => {      
    console.log(`Server is running on port ${PORT}`);
});

// .listen This tells Express: Start the server and keep listening for incoming requests from browser.