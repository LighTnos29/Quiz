import { useContext } from "react";
import { QuizContext } from "./context/QuizContext";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Quiz />
    </div>
  );
};

export default App;
