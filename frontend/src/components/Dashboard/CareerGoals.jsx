import { useNavigate } from "react-router-dom";

function CareerGoals({ dashboardData }) {

    const navigate = useNavigate();

    const goals = dashboardData?.goals || [];

    return (
        <div className="career-goals">

            <h3>Career Goals</h3>

            <p>
                Track your progress toward your target career.
            </p>

            <div className="goal-summary">

                <span>
                    Active Goals:{" "}
                    {dashboardData?.activeGoals || 0}
                </span>

                <span>
                    Completed Goals:{" "}
                    {dashboardData?.completedGoals || 0}
                </span>

            </div>

            {goals.length === 0 ? (

                <p>
                    No career goals yet.
                </p>

            ) : (

                <div className="career-goal-list">

                    {goals.map((goal) => (

                        <div
                            key={goal.id}
                            className="goal-card"
                            onClick={() =>
                                navigate(`/goals/${goal.id}`)
                            }
                        >

                            <h3>
                                {goal.title}
                            </h3>

                            <p>
                                Target Role:{" "}
                                {goal.targetRole}
                            </p>

                            <div className="goal-progress-header">

                                <span>
                                    Progress
                                </span>

                                <strong>
                                    {goal.progress}%
                                </strong>

                            </div>

                            <div className="goal-progress">

                                <div
                                    className="goal-progress-fill"
                                    style={{
                                        width:
                                            `${goal.progress}%`,
                                    }}
                                />

                            </div>

                            <span className="goal-status">
                                {goal.status}
                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default CareerGoals;