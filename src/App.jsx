import React, { useState } from 'react'
import "./App.css";
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ResultSection from './components/ResultSection'
import LoadingAI from "./components/LoadingAI";


const App = () => {

  const [result, setResult] = useState(null);

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="app-container">

        <Header />

        <UploadSection
          setShowResult={setShowResult}
          loading={loading}
          setLoading={setLoading}
          setResult={setResult}
        />

        {loading && <LoadingAI />}

        {showResult && <ResultSection result={result} />}

      </div>
    </>
  )
}

export default App