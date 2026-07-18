require("dotenv").config();

const fs = require("fs"); // read files from the computer

const pdfParse = require("pdf-parse"); // extracts text content from pdf file

const express = require("express");  // this has installed the express libraries 

const cors = require("cors");

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

app.use(cors());

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

Analyze the following resume.

Return ONLY a valid JSON object.

Do NOT include markdown.
Do NOT use \`\`\`json.
Do NOT write explanations before or after the JSON.

The JSON format must be:

{
  "atsScore": number,
  "summary": "string",
  "skills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "strengths": [
    "strength1",
    "strength2"
  ],
  "improvements": [
    "improvement1",
    "improvement2"
  ]
}

Resume:

${data.text}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    const analysis = JSON.parse(response.text);

    console.log(analysis);
    
    res.json(analysis);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// .listen This tells Express: Start the server and keep listening for incoming requests from browser.