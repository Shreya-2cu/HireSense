import React, { useState, useEffect } from "react";

const LoadingAI = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        "Resume uploaded",
        "Reading PDF",
        "Understanding your experience",
        "Calculating ATS score",
        "Writing personalized suggestions"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep < steps.length - 1) {
                    return prevStep + 1;
                }
                return prevStep;
            });
        }, 1500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="loading-card">
            <h2>🤖 HireSense AI</h2>

            <p>Analyzing your resume...</p>
            <h3>{steps[currentStep]}</h3>
            <br />
            {steps.map((step, index) => (
                <p key={index}>
                    {index < currentStep
                        ? "✅"
                        : index === currentStep
                        ? "⏳"
                        : "⬜"}{" "}
                    {step}
                </p>
            ))}

            <p>Please don't close this page.</p>
        </div>
    );
};

export default LoadingAI;