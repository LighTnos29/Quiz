import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { getQuizHistory } from "../utils/indexedDB"; // Import history fetcher

const Result = () => {
  const { score, questions, restartQuiz } = useContext(QuizContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getQuizHistory().then(setHistory);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#121212] text-white font-[neue]">
      <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-700">
        <h2 className="text-4xl font-bold text-[#EDEDED] text-center mb-6">🎉 Quiz Completed!</h2>
        
        <p className="text-xl text-center text-green-400 font-semibold mb-4">
          Your Score: {score} / {questions.length}
        </p>

        <button
          onClick={restartQuiz}
          className="bg-blue-500 hover:bg-blue-400 text-white p-3 w-full rounded-md transition-all mb-6"
        >
          Restart Quiz
        </button>

        <h3 className="text-lg font-semibold text-gray-300 mb-4">📜 Quiz History:</h3>
        <div className="max-h-40 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No past quizzes found.</p>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="bg-[#2A2A2A] p-3 rounded-md mb-2">
                <p className="text-gray-200 text-sm">
                  <span className="font-semibold">Score:</span> {entry.score} / {entry.totalQuestions}
                </p>
                <p className="text-gray-400 text-xs">{entry.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
