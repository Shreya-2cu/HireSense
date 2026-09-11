const getGoalSkillGaps = (goal, resumeSkills) => {
    const normalizedResumeSkills = resumeSkills.map((skill) =>
        skill.trim().toLowerCase()
    );

    const skillGaps = goal.targetSkills.filter((skill) => {
        return !normalizedResumeSkills.includes(
            skill.trim().toLowerCase()
        );
    });

    return skillGaps;
};

module.exports = {
    getGoalSkillGaps,
};