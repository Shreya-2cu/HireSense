import React from "react";
import {
  FileText,
  Brain,
  Award,
  TrendingUp,
  TriangleAlert
} from "lucide-react";


const ResultSection = ({ result }) => {
  if (!result) return null;

return (
  <div className="result-card">

    <h2>HireSense Report</h2>

    <div className="ats-card">

  <div className="ats-number">
    {result.atsScore}%
  </div>

  <p>ATS Match Score</p>

  <span className="ats-status">
    {result.atsScore >= 90
      ? "Excellent"
      : result.atsScore >= 75
      ? "Strong"
      : result.atsScore >= 60
      ? "Good"
      : "Needs Improvement"}
  </span>

</div>

    <div className="dashboard-grid">

      <div className="dashboard-card">

        <h3>
          <FileText size={20}/>
          Resume Summary
        </h3>

        <p>{result.summary}</p>

      </div>

      <div className="dashboard-card">

        <h3>
          <Brain size={20}/>
          Skills Found
        </h3>

        <div className="skill-container">

          {result.skills.length > 0 ? (
            result.skills.map((skill,index)=>(
              <span className="skill-chip" key={index}>
                {skill}
              </span>
            ))
          ) : (
            <p>No skills detected.</p>
          )}

        </div>

      </div>

      <div className="dashboard-card">

        <h3>
          <TriangleAlert size={20}/>
          Missing Skills
        </h3>

        <div className="skill-container">

          {result.missingSkills.length>0 ? (
            result.missingSkills.map((skill,index)=>(
              <span className="missing-chip" key={index}>
                {skill}
              </span>
            ))
          ) : (
            <p>No missing skills identified.</p>
          )}

        </div>

      </div>

      <div className="dashboard-card">

        <h3>
          <Award size={20}/>
          Strengths
        </h3>

        {result.strengths.length>0 ? (

          <ul>

            {result.strengths.map((strength,index)=>(
              <li key={index}>{strength}</li>
            ))}

          </ul>

        ) : (
          <p>No strengths identified.</p>
        )}

      </div>

    </div>

    <div className="dashboard-card improvement-card">

      <h3>
        <TrendingUp size={20}/>
        Areas for Improvement
      </h3>

      {result.improvements.length>0 ? (

        <ul>

          {result.improvements.map((item,index)=>(
            <li key={index}>{item}</li>
          ))}

        </ul>

      ) : (
        <p>No improvements suggested.</p>
      )}

    </div>

  </div>
);
};

export default ResultSection;