import { useEffect, useState } from "react";
import API from "../services/api";
import UploadSection from "../components/UploadSection";
import ResultSection from "../components/ResultSection";
import LoadingAI from "../components/LoadingAI";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dashboardData, setDashboardData] = useState({
        totalResumes: 0,
        highestATS: 0,
        averageATS: 0,
        latestATS: 0,
    });

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await API.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(
                "Dashboard API Response:",
                response.data
            );

            setDashboardData(response.data);

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <>

        <Navbar />

        <div className="dashboard-page">

            {/* Header */}

            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Track your resume performance and
                        improve your career profile.
                    </p>
                </div>

            </div>


            {/* Analytics */}

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

            </div>


            {/* Resume Upload */}

            <div className="dashboard-section">

                <h2>
                    Analyze a Resume
                </h2>

                <p>
                    Upload your resume and let HireSense
                    analyze your career profile.
                </p>

                <UploadSection
                    setShowResult={setShowResult}
                    loading={loading}
                    setLoading={setLoading}
                    setResult={setResult}
                />

            </div>


            {/* Loading */}

            {loading && (
                <LoadingAI />
            )}


            {/* Result */}

            {showResult && (
                <div className="dashboard-section">

                    <ResultSection
                        result={result}
                    />

                </div>
            )}

        </div>
        </>

    );
}

export default Dashboard;