import React, { useState } from "react";

const UploadSection = ({ setShowResult, loading, setLoading, }) => {

    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setResume(event.target.files[0]);
    };

    const handleAnalyze = () => {

        if (!resume) {
            setMessage("Please upload a PDF.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setMessage("Resume uploaded successfully.");
            setShowResult(true);
        }, 2000);

    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
            />
            {resume && <p>Selected File: {resume.name}</p>}

            <br /><br />

            <button onClick={handleAnalyze} disabled={!resume || loading}>{loading ? "Analyzing Resume..." : "Analyze Resume"}</button>
            {message && <p>{message}</p>}

        </div>
    );
};

export default UploadSection;