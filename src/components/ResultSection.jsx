import React from "react";

const ResultSection = ({ result }) => {

  return (
    <div>
      <h2>Analysis Result</h2>

      <h3>ATS Score: {result.atsScore}/100</h3>

      <h3>Resume Summary</h3>
      <p>{result.summary}</p>

      <h3>Skills Found</h3>
      <ul>
        {result.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Missing Skills</h3>
      <ul>
        {result.missingSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Strengths</h3>
      <ul>
        {result.strengths.map((strength, index) => (
          <li key={index}>{strength}</li>
        ))}
      </ul>

      <h3>Areas for Improvement</h3>
      <ul>
        {result.improvements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};


export default ResultSection;