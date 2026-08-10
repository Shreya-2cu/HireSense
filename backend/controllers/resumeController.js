const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");
const Resume = require("../models/Resume");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (req, res) => {
    try {

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
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        const analysis = JSON.parse(response.text);

        const resume = new Resume({
            user: req.user.id,

            fileName: req.file.originalname,

            atsScore: analysis.atsScore,

            summary: analysis.summary,

            skills: analysis.skills,

            missingSkills: analysis.missingSkills,

            strengths: analysis.strengths,

            improvements: analysis.improvements,
        });

        await resume.save();

        res.json(analysis);

    } catch (error) {
        console.error("Error analyzing resume:", error);

        res.status(500).json({
            error: "Something went wrong while analyzing the resume.",
        });

    } finally {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

const getResumeHistory = async (req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user.id,
        });

        res.status(200).json({
            resumes,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch resume history.",
        });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found.",
            });
        }

        res.status(200).json({
            resume,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

const deleteResume = async (req, res) => {
    try {

        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found.",
            });
        }

        res.status(200).json({
            message: "Resume deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Something went wrong.",
        });

    }
};

module.exports = {
    analyzeResume,
    getResumeHistory,
    getResumeById,
    deleteResume

};