import React from "react";

const ResultSection = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-card">
      <h2>HireSense Report</h2>

      <h3 className="score">{result.atsScore}% ATS Match</h3>

      <h3>Resume Summary</h3>
      <p>{result.summary}</p>

      <h3>Skills Found</h3>
      <div className="skill-container">
        {result.skills.length > 0 ? (
          result.skills.map((skill, index) => (
            <span className="skill-chip" key={index}>
              {skill}
            </span>
          ))
        ) : (
          <p>No skills detected.</p>
        )}
      </div>

      <h3>Missing Skills</h3>
      <div className="skill-container">
        {result.missingSkills.length > 0 ? (
          result.missingSkills.map((skill, index) => (
            <span className="missing-chip" key={index}>
              {skill}
            </span>
          ))
        ) : (
          <p>No missing skills identified.</p>
        )}
      </div>

      <h3>Strengths</h3>
      {result.strengths.length > 0 ? (
        <ul>
          {result.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      ) : (
        <p>No strengths identified.</p>
      )}

      <h3>Areas for Improvement</h3>
      {result.improvements.length > 0 ? (
        <ul>
          {result.improvements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No improvements suggested.</p>
      )}
    </div>
  );
};

export default ResultSection;