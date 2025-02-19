import { createContext, useState, useEffect } from "react";
import questions from "../data/questions.json";
import { saveQuizHistory } from "../utils/indexedDB"; // Import utility

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== null || isQuizFinished) return;

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedAnswer, isQuizFinished]);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setIsQuizFinished(true);
      saveQuizHistory(score, questions.length); // Save quiz result
    }
  };

  const checkAnswer = (answer) => {
    if (selectedAnswer !== null || isQuizFinished) return;

    if (answer === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer(answer);

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(30);
    setIsQuizFinished(false);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        score,
        selectedAnswer,
        timeLeft,
        isQuizFinished,
        nextQuestion,
        checkAnswer,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
