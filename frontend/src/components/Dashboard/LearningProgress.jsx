function LearningProgress({ dashboardData }) {

    const totalTasks = dashboardData?.totalTasks || 0;
    const completedTasks = dashboardData?.completedTasks || 0;
    const completionRate =
        dashboardData?.taskCompletionRate || 0;

    return (
        <div className="learning-progress">

            <h3>
                Learning Progress
            </h3>

            <p>
                Track how much of your learning plan
                you have completed.
            </p>


            {/* Task Summary */}

            <div className="learning-summary">

                <div>
                    <span>
                        Total Tasks
                    </span>

                    <strong>
                        {totalTasks}
                    </strong>
                </div>


                <div>
                    <span>
                        Completed
                    </span>

                    <strong>
                        {completedTasks}
                    </strong>
                </div>


                <div>
                    <span>
                        Completion Rate
                    </span>

                    <strong>
                        {completionRate}%
                    </strong>
                </div>

            </div>


            {/* Progress Bar */}

            <div className="learning-progress-bar">

                <div
                    className="learning-progress-fill"
                    style={{
                        width: `${completionRate}%`,
                    }}
                />

            </div>


            <p>
                {completedTasks} of {totalTasks} tasks completed
            </p>

        </div>
    );
}

export default LearningProgress;