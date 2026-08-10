import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ResumeHistory() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get(
                    "/resume/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setResumes(response.data.resumes);

            } catch (error) {

                console.error("History Error:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchHistory();

    }, []);

    if (loading) {
        return (
            <div className="history-page">
                <h1>Resume History</h1>
                <p>Loading your resumes...</p>
            </div>
        );
    }

    return (
        <>

            <Navbar />

            <div className="history-page">

                <div className="history-header">

                    <div>
                        <h1>Resume History</h1>

                        <p>
                            Review your previous resume analyses
                            and track your progress.
                        </p>
                    </div>

                    <button
                        className="history-upload-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Analyze New Resume
                    </button>

                </div>


                {resumes.length === 0 ? (

                    <div className="empty-history">

                        <h2>No resumes yet</h2>

                        <p>
                            Upload your first resume to start
                            tracking your ATS performance.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard")}
                        >
                            Analyze Resume
                        </button>

                    </div>

                ) : (

                    <div className="resume-history-list">

                        {resumes.map((resume) => (

                            <div
                                className="resume-history-card"
                                key={resume._id}
                            >

                                <div className="resume-info">

                                    <h2>
                                        {resume.fileName}
                                    </h2>

                                    <p>
                                        Analyzed on{" "}
                                        {new Date(
                                            resume.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>


                                <div className="resume-score">

                                    <span>ATS Score</span>

                                    <strong>
                                        {resume.atsScore}
                                    </strong>

                                </div>


                                <button
                                    className="view-resume-btn"
                                    onClick={() =>
                                        navigate(
                                            `/resume/${resume._id}`
                                        )
                                    }
                                >
                                    View Resume →
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}

export default ResumeHistory;