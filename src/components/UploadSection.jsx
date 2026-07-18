import React, { useState } from "react";

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
                "http://localhost:5000/analyze-resume",
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
                setMessage("Unable to connect to the server. Please make sure the backend is running.");
            } else {
                setMessage(error.message || "Something went wrong. Please try again.");
            }
        }

        finally {
            setLoading(false);
        }
    
    
};

return (
    <div className="upload-section">
        <label htmlFor="resume-upload" className="upload-box">
            <h3>📄 Upload Resume</h3>
            <p>Only PDF files are allowed</p>
        </label>

        <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            hidden
        />

        {resume && <p>Selected File: {resume.name}</p>}

        <br />
        <br />

        <button
            onClick={handleAnalyze}
            disabled={!resume || loading}
        >
            {loading ? (
                <>
                    <span className="spinner"></span>
                    Analyzing...
                </>
            ) : (
                "Analyze Resume"
            )}
        </button>

        {message && <p>{message}</p>}
    </div>
);
};

export default UploadSection;