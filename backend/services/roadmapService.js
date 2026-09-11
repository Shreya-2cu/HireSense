const { generateAIContent } = require("./aiService");

const generateRoadmap = async ({
    targetRole,
    targetSkills,
    resumeSkills,
    skillGaps,
}) => {

    const prompt = `
You are a career development assistant.

Create a personalized learning roadmap for a user.

Target Role:
${targetRole}

Target Skills:
${targetSkills.join(", ")}

Current Resume Skills:
${resumeSkills.join(", ")}

Skill Gaps:
${skillGaps.join(", ")}

Create a practical roadmap that helps the user move
from their current skill level toward the target role.

Rules:

1. Prioritize the identified skill gaps.
2. Build the roadmap in logical learning phases.
3. Each phase should contain specific skills.
4. Each skill should contain practical tasks.
5. Tasks should be achievable by a student.
6. Prefer hands-on implementation over theory.
7. Do not recommend unnecessary technologies.
8. Keep the roadmap realistic.

Return ONLY valid JSON.

Use exactly this structure:

{
    "roadmap": [
        {
            "phase": 1,
            "title": "Phase title",
            "description": "Short description",
            "skills": [
                {
                    "name": "Skill name",
                    "tasks": [
                        "Task 1",
                        "Task 2",
                        "Task 3"
                    ]
                }
            ]
        }
    ]
}
`;

    const response = await generateAIContent(prompt);

    const cleanedResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanedResponse);
};

module.exports = {
    generateRoadmap,
};