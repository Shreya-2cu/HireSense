function DashboardOverview({ dashboardData }) {

    return (
        <div className="dashboard-section">

            <h2>Overview</h2>

            <div className="analytics-grid">

                <div className="analytics-card">
                    <span>Total Resumes</span>

                    <strong>
                        {dashboardData.totalResumes}
                    </strong>
                </div>

                <div className="analytics-card">
                    <span>Highest ATS</span>

                    <strong>
                        {dashboardData.highestATS}
                    </strong>
                </div>

                <div className="analytics-card">
                    <span>Average ATS</span>

                    <strong>
                        {dashboardData.averageATS}
                    </strong>
                </div>

                <div className="analytics-card">
                    <span>Latest ATS</span>

                    <strong>
                        {dashboardData.latestATS}
                    </strong>
                </div>

                <div className="analytics-card">
                    <span>ATS Improvement</span>

                    <strong>
                        {dashboardData.atsImprovement > 0
                            ? `+${dashboardData.atsImprovement}`
                            : dashboardData.atsImprovement}
                    </strong>
                </div>

            </div>

        </div>
    );
}

export default DashboardOverview;