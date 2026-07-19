import React, { useEffect, useState } from "react";
import { Brain, Sparkles, CheckCircle2 } from "lucide-react";

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

            <div className="loading-icon">
                <Brain size={42} />
            </div>

            <h2>HireSense AI</h2>

            <p className="loading-subtitle">
                Analyzing your resume with AI...
            </p>

            <div className="loading-progress">

                {steps.map((step, index) => (

                    <div
                        key={index}
                        className={`loading-step ${index < currentStep
                                ? "completed-step"
                                : index === currentStep
                                    ? "current-step"
                                    : ""
                            }`}
                    >

                        <CheckCircle2 size={18} />

                        <span>{step}</span>

                    </div>

                ))}

            </div>

            <div className="loading-footer">

                <Sparkles size={16} />

                <span>
                    This usually takes only a few seconds.
                </span>

            </div>

        </div>
    );
};

export default LoadingAI;