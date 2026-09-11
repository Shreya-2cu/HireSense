const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateAIContent = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
};

const generateRoadmap = async ({
    targetRole,
    targetSkills,
    skillGaps,
}) => {
    const prompt = `
You are an expert career learning-path designer.

Create a practical learning roadmap for a user targeting the role:

Target Role:
${targetRole}

Target Skills:
${targetSkills.join(", ")}

Current Skill Gaps:
${skillGaps.join(", ")}

Your task is to create learning tasks that directly address the current skill gaps.

Requirements:
1. Create 2 to 4 practical learning tasks for each skill gap.
2. Tasks should progress from fundamentals to practical application.
3. Tasks should be realistic for a student or early-career developer.
4. Focus primarily on the provided skill gaps.
5. Do not introduce unrelated skills.
6. The "skill" field must match one of the provided skill gaps.
7. Each task must contain:
   - title
   - description
   - skill
8. Return ONLY valid JSON.
9. Do NOT include markdown.
10. Do NOT include \`\`\`json.
11. Do NOT include explanations outside the JSON.

Return exactly this structure:

{
    "tasks": [
        {
            "title": "string",
            "description": "string",
            "skill": "string"
        }
    ]
}
`;

    const response = await generateAIContent(prompt);

    return JSON.parse(response);
};

module.exports = {
    generateAIContent,
    generateRoadmap,
};