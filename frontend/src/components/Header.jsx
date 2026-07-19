import React from "react";
import { Brain, BarChart3, Zap } from "lucide-react";

const Header = () => {
  return (
    <div className="header">
      <h1>HireSense</h1>

      <h2>Build Resumes That Recruiters Want to Read</h2>

      <p>
        Upload your resume and receive an instant ATS score, personalized AI
        insights, skill gap analysis, and practical recommendations to
        strengthen your resume for modern hiring systems.
      </p>

      <div className="hero-badges">

        <div className="badge">
          <Brain size={18} />
          <span>AI Powered</span>
        </div>

        <div className="badge">
          <BarChart3 size={18} />
          <span>ATS Score</span>
        </div>

        <div className="badge">
          <Zap size={18} />
          <span>Instant Analysis</span>
        </div>

        <p className="hero-note">
          No signup required • Secure PDF processing • Instant AI feedback
        </p>

      </div>

    </div>
  );
};

export default Header;

