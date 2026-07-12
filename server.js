require("dotenv").config();

const fs = require("fs"); // read files from the computer

const pdfParse = require("pdf-parse"); // extracts text content from pdf file

const express = require("express");  // this has installed the express libraries 

const multer = require("multer");   // import multer

const { GoogleGenAI } = require("@google/genai"); // imports genAI which lets backend talk to gemini 

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}); // storage stores the uploaded file 

const upload = multer({ storage }); // upload receives the file 

const app = express(); // this creates our express application 

app.use(express.json());

const PORT = 5000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.post("/analyze-resume", upload.single("resume"), async (req, res) => {

    console.log(req.file);
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const prompt = `
You are an experienced ATS resume reviewer.

Analyze the following resume and provide:

1. A short professional summary of the candidate.
2. The strengths of the resume.
3. Weaknesses or areas for improvement.
4. An ATS score out of 100.
5. Suggestions to improve the resume.

Resume:

${data.text}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    console.log(response.text);

    console.log(data);

    res.json({
        message: "Resume received Successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// .listen This tells Express: Start the server and keep listening for incoming requests from browser.