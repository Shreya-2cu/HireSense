function SkillGaps({ dashboardData }) {

    const skillGaps = dashboardData?.skillGaps || [];

    return (
        <div className="skill-gaps">

            <h3>
                Skill Gaps
            </h3>

            <p>
                Skills that appear most frequently as gaps
                across your resume analyses.
            </p>


            {skillGaps.length === 0 ? (

                <p>
                    No skill gaps found.
                </p>

            ) : (

                <div className="skill-gap-list">

                    {skillGaps.map((skill, index) => {

                        const skillName =
                            skill._id || skill.skill;

                        const count =
                            skill.count || 0;

                        return (

                            <div
                                className="skill-gap-item"
                                key={skillName || index}
                            >

                                <div className="skill-gap-header">

                                    <span>
                                        {skillName}
                                    </span>

                                    <strong>
                                        {count}
                                    </strong>

                                </div>


                                <div className="skill-gap-bar">

                                    <div
                                        className="skill-gap-fill"
                                        style={{
                                            width: `${Math.min(
                                                count * 20,
                                                100
                                            )}%`,
                                        }}
                                    />

                                </div>

                                <small>
                                    Missing in {count} resume
                                    {count !== 1 ? "s" : ""}
                                </small>

                            </div>

                        );
                    })}

                </div>

            )}

        </div>
    );
}

export default SkillGaps;