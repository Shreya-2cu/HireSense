function ATSProgress({ dashboardData }) {

    const latestATS = dashboardData?.latestATS || 0;
    const previousATS = dashboardData?.previousATS || 0;
    const atsImprovement = dashboardData?.atsImprovement || 0;

    const atsHistory = dashboardData?.atsHistory || [];

    return (
        <div className="ats-progress">

            <h3>
                ATS Progress
            </h3>

            <p>
                Track how your resume performance has changed
                over time.
            </p>


            {/* ATS Summary */}

            <div className="ats-summary">

                <div>
                    <span>
                        Previous ATS
                    </span>

                    <strong>
                        {previousATS}
                    </strong>
                </div>


                <div>
                    <span>
                        Latest ATS
                    </span>

                    <strong>
                        {latestATS}
                    </strong>
                </div>


                <div>
                    <span>
                        Improvement
                    </span>

                    <strong>
                        {atsImprovement > 0
                            ? `+${atsImprovement}`
                            : atsImprovement}
                    </strong>
                </div>

            </div>


            {/* Current ATS Progress */}

            <div className="ats-progress-bar">

                <div
                    className="ats-progress-fill"
                    style={{
                        width: `${latestATS}%`,
                    }}
                />

            </div>


            <p>
                Current ATS Score: {latestATS}/100
            </p>


            {/* ATS History */}

            {atsHistory.length > 1 && (

                <div className="ats-history">

                    <h4>
                        Score History
                    </h4>

                    {atsHistory.map((item, index) => (

                        <div
                            className="ats-history-item"
                            key={item.createdAt || index}
                        >

                            <span>
                                Resume {index + 1}
                            </span>

                            <strong>
                                {item.atsScore}
                            </strong>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default ATSProgress;