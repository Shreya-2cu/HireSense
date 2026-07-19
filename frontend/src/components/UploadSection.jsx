import React, { useState } from "react";
import { Upload, ArrowRight } from "lucide-react";

const UploadSection = ({
    setShowResult,
    loading,
    setLoading,
    setResult,
}) => {
    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            setMessage("Please upload a valid PDF file.");
            setResume(null);
            setShowResult(false);
            event.target.value = "";
            return;
        }

        setResume(file);
        setMessage("");
        setShowResult(false);
    };

    const handleAnalyze = async () => {
        if (!resume) {
            setMessage("Please upload a PDF.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("resume", resume);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/analyze-resume`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to analyze resume.");
            }

            const data = await response.json();

            setResult(data);
            setShowResult(true);
        }
        catch (error) {
            console.error(error);

            if (error.name === "TypeError") {
                setMessage(
                    "The AI server is waking up. Please wait about a minute and try again."
                );
            } else {
                setMessage(
                    "We couldn't analyze your resume this time. Please try again in a few seconds."
                );
            }
        }

        finally {
            setLoading(false);
        }


    };

    return (
        <div className="upload-section">

            <label htmlFor="resume-upload" className="upload-box">

                <div className="upload-icon">
                    <Upload size={52} strokeWidth={2} />
                </div>

                <h3>Upload Your Resume</h3>

                <p>
                    Drag & drop your PDF here or click to browse
                </p>

                <span className="browse-btn">
                    Choose PDF
                </span>

            </label>

            <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                hidden
            />

            {resume && (
                <div className="selected-file">
                    ✅ {resume.name}
                </div>
            )}

            <button
                onClick={handleAnalyze}
                disabled={!resume || loading}
                className="analyze-btn"
            >
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        AI is analyzing your resume...
                    </>
                ) : (
                    <>
                        Analyze Resume
                        <ArrowRight size={18} />
                    </>
                )}
            </button>

            {loading && (
                <div className="message info">
                    🚀 If this is your first request, the AI server may take up to 60
                    seconds to wake up.
                </div>
            )}

            {message && (
                <div className="message">
                    {message}
                </div>
            )}

        </div>
    );
}

export default UploadSection;