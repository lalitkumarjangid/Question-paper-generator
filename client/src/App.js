import React, { useState } from "react";
import axios from "axios";

function App() {
  const [totalMarks, setTotalMarks] = useState("");
  const [easyPercentage, setEasyPercentage] = useState("");
  const [mediumPercentage, setMediumPercentage] = useState("");
  const [hardPercentage, setHardPercentage] = useState("");
  const [paper, setPaper] = useState(null);
  const [error, setError] = useState(null);

  const generatePaper = async () => {
    try {
      if (
        !totalMarks ||
        !easyPercentage ||
        !mediumPercentage ||
        !hardPercentage
      ) {
        setError("Please fill in all fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/generate-paper",
        {
          totalMarks,
          difficultyDistribution: {
            Easy: easyPercentage,
            Medium: mediumPercentage,
            Hard: hardPercentage,
          },
        }
      );

      setPaper(response.data.paper);
      setError(null);
    } catch (error) {
      setPaper(null);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="App ">
      <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tighttext-blue-600 dark:text-blue-500">
        Question Paper Generator
      </h1>
      <div className="input-group mb-3">
        <label className="block mb-2 text-sm font-medium text-black-900 dark:text-grey">
          Total Marks:
        </label>
        <input
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          placeholder="Enter total marks"
        />
      </div>
      <div className="input-group">
        <label className="block mb-2 text-sm font-medium text-black-900 dark:text-grey">
          Easy Percentage:
        </label>
        <input
          type="number"
          value={easyPercentage}
          onChange={(e) => setEasyPercentage(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>
      <div className="input-group">
        <label className="block mb-2 text-sm font-medium text-black-900 dark:text-grey">
          Medium Percentage:
        </label>
        <input
          type="number"
          value={mediumPercentage}
          onChange={(e) => setMediumPercentage(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>
      <div className="input-group mb-3">
        <label className="block mb-2 text-sm font-medium text-black-900 dark:text-grey">
          Hard Percentage:
        </label>
        <input
          type="number"
          value={hardPercentage}
          onChange={(e) => setHardPercentage(e.target.value)}
          placeholder="Enter percentage"
        />
      </div>
      <button
        className="  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={generatePaper}>
        Generate Paper
      </button>

      {paper && (
        <div className="result-container ">
          <h2 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Generated Paper
            </span>
          </h2>
          <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {paper.map((q, index) => (
              <li className="pb-3 sm:pb-4" key={index}>
                <strong>Question:</strong> {q.question}
                <br />
                <strong>Subject:</strong> {q.subject}
                <br />
                <strong>Topic:</strong> {q.topic}
                <br />
                <strong>Difficulty:</strong>
                {q.difficulty}
                <br />
                <strong>Marks:</strong>
                {q.marks}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
