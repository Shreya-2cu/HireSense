import React, { useState } from 'react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ResultSection from './components/ResultSection'


const App = () => {


  const result = {
    atsScore: 82,
    summary: "This resume shows a good foundation...",
    skills: ["React", "Java", "SQL"],
    missingSkills: ["Node.js", "Express.js", "REST APIs"],
    strengths: [
      "Good project experience",
      "Research paper experience",
    ],
    improvements: [
      "Add measurable achievements",
      "Improve technical skills section",
    ],
  };

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <UploadSection
        setShowResult={setShowResult}
        loading={loading}
        setLoading={setLoading}
      />
      {showResult && <ResultSection result={result} />}    
      
    </>
  )
}

export default App