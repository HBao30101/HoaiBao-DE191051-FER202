import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "SUBMIT_ANSWER":
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      const showScore = nextQuestion === state.questions.length;
      
      // Update high score if current score is higher
      const newHighScore = Math.max(state.highScore, state.score);
      if (showScore && newHighScore > state.highScore) {
        localStorage.setItem("quizHighScore", newHighScore.toString());
      }
      
      return {
        ...state,
        currentQuestion: nextQuestion,
        selectedOption: "",
        showFeedback: false,
        isCorrect: false,
        showScore: showScore,
        highScore: newHighScore,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore, // Giữ lại điểm cao
      };

    case "TIME_UP":
      return {
        ...state,
        showFeedback: true,
        isCorrect: false,
        selectedOption: "TIME_UP", // Đánh dấu là hết giờ
      };

    case "SET_HIGH_SCORE":
      return {
        ...state,
        highScore: action.payload,
      };

    default:
      return state;
  }
}

// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerActive, setTimerActive] = useState(true);

  const { questions, currentQuestion, selectedOption, score, showScore, showFeedback, isCorrect, highScore } = state;

  // Load high score from localStorage khi component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore");
    if (savedHighScore) {
      dispatch({ type: "SET_HIGH_SCORE", payload: parseInt(savedHighScore) });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (showScore || showFeedback || !timerActive) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Time's up!
        dispatch({ type: "TIME_UP" });
        setTimerActive(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showScore, showFeedback, timerActive]);

  // Reset timer khi chuyển câu hỏi
  useEffect(() => {
    if (!showScore) {
      setTimeLeft(10);
      setTimerActive(true);
    }
  }, [currentQuestion, showScore]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption && !showFeedback) {
      dispatch({ type: "SUBMIT_ANSWER" });
      setTimerActive(false);
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  // Tính phần trăm tiến trình
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {/* Progress và Timer */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>
              Question {currentQuestion + 1} / {questions.length}
            </strong>
          </div>
          <div className={`text-${timeLeft < 5 ? 'danger' : 'primary'} fw-bold`}>
            Time: {timeLeft}s
          </div>
        </div>

        <ProgressBar 
          now={progress} 
          className="mb-3" 
          label={`${Math.round(progress)}%`}
        />

        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <h4 className="mt-3">
              High Score: {highScore} / {questions.length}
            </h4>
            {score === questions.length && (
              <Alert variant="success" className="mt-3">
                <FaCheckCircle className="me-2" />
                Perfect Score! Congratulations! 🎉
              </Alert>
            )}
            {score > highScore && (
              <Alert variant="warning" className="mt-3">
                🏆 New High Score! 🏆
              </Alert>
            )}
            <Button variant="primary" onClick={handleRestartQuiz} className="mt-3">
              Restart Quiz
            </Button>
          </div>
        ) : showFeedback ? (
          <div className="text-center">
            {isCorrect ? (
              <Alert variant="success">
                <FaCheckCircle className="me-2" size={24} />
                <strong>Correct! 🎉</strong>
              </Alert>
            ) : (
              <Alert variant="danger">
                <FaTimesCircle className="me-2" size={24} />
                <strong>Incorrect!</strong> 
                {selectedOption === "TIME_UP" 
                  ? " Time's up!" 
                  : ` The correct answer is: ${questions[currentQuestion].answer}`
                }
              </Alert>
            )}
            
            <div className="mt-4">
              <h4>
                Question {questions[currentQuestion].id}:<br />
                {questions[currentQuestion].question}
              </h4>
              <div className="mt-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      option === questions[currentQuestion].answer
                        ? "success"
                        : option === selectedOption && !isCorrect
                        ? "danger"
                        : "outline-secondary"
                    }
                    className="m-2"
                    disabled
                  >
                    {option}
                    {option === questions[currentQuestion].answer && isCorrect && (
                      <FaCheckCircle className="ms-2" />
                    )}
                    {option === selectedOption && !isCorrect && (
                      <FaTimesCircle className="ms-2" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-3"
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "See Results"
                : "Next Question"}
            </Button>
          </div>
        ) : (
          <div>
            <h4>
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>
            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "primary" : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="text-muted">
                High Score: {highScore} / {questions.length}
              </div>
              <Button
                variant="success"
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
              >
                Submit Answer
              </Button>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;