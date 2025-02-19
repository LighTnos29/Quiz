import { useContext, useState, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import Result from "./Result";

const Quiz = () => {
  const {
    questions,
    currentQuestion,
    checkAnswer,
    selectedAnswer,
    timeLeft,
    isQuizFinished,
  } = useContext(QuizContext);

  const currentQ = questions[currentQuestion];
  const [inputAnswer, setInputAnswer] = useState("");

  useEffect(() => {
    setInputAnswer("");
  }, [currentQuestion]);

  if (isQuizFinished) {
    return <Result />;
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#121212] text-white font-[neue]">
      <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-700">
        <h2 className="text-4xl font-bold text-[#EDEDED] text-center mb-6">🧠 Quiz Time</h2>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">Question {currentQuestion + 1} / {questions.length}</p>
          <p className="text-red-500 font-bold text-lg">⏳ {timeLeft}s</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-200 mb-6">{currentQ.question}</h3>

        {currentQ.options ? (
          currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => checkAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`block w-full p-3 rounded-md text-lg transition-all mb-3 
                ${
                  selectedAnswer === option
                    ? "bg-green-500 text-white"
                    : "bg-[#2A2A2A] text-gray-300 hover:bg-gray-700"
                }`}
            >
              {option}
            </button>
          ))
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="number"
              className="bg-[#2A2A2A] border border-gray-600 p-3 w-full rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your answer"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
            />
            <button
              onClick={() => {
                checkAnswer(parseInt(inputAnswer));
                setInputAnswer("");
              }}
              className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-md transition-all"
              disabled={!inputAnswer}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
