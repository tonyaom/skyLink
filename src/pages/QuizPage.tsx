import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import NavBar from "../components/NavBar";

const questions = [
  {
    question: "What is the biggest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What do radio telescopes help scientists study?",
    options: ["The Sun", "Radio waves from space", "Clouds", "Dinosaurs"],
    answer: "Radio waves from space",
  },
  {
    question: "What planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Earth", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Milky Way", "Andromeda", "Sombrero", "Pinwheel"],
    answer: "Milky Way",
  },
  {
    question: "What is a black hole?",
    options: [
      "A star",
      "A planet",
      "A region in space with very strong gravity",
      "A moon",
    ],
    answer: "A region in space with very strong gravity",
  },
];

const QuizPage = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the answers array with "No answer" for each question
    const initialAnswers = questions.map(() => "No answer");
    setAnswers(initialAnswers);
  }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleEndTest = () => {
    navigate("/results", { state: { answers, questions } });
  };

  const totalTime = 50; // Set total time in seconds (can be adjusted)
  const [timeLeft, setTimeLeft] = useState(totalTime); // Initialize timeLeft with totalTime
  const [timerActive, setTimerActive] = useState(true);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Convert time in seconds to minutes and seconds format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerActive(false); // Stop the timer when time is up
      setIsTimeUp(true); // Set time-up state
      return;
    }
    if (timerActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1); // Decrease time by 1 second
      }, 1000);
      return () => clearInterval(timer); // Clean up timer
    }
  }, [timeLeft, timerActive]);

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ padding: 4 }}>
        <h2>Time Remaining: {formatTime(timeLeft)}</h2>

        {/* Show test end message if time is up */}
        {isTimeUp ? (
          <Typography variant="h5" color="error" align="center">
            Test Ended
          </Typography>
        ) : (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {questions[currentQuestion].question}
            </Typography>
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onChange={handleAnswerChange}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>

            <Button
              variant="contained"
              color="error" // Using modern red color for "Previous" button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              sx={{
                marginRight: 2,
                backgroundColor: "rgba(244, 67, 54, 1)", // A rich red for "Previous"
                "&:hover": {
                  backgroundColor: "rgba(244, 67, 54, 0.8)", // Slightly lighter on hover
                },
                borderRadius: "8px", // Rounded corners for a modern look
                padding: "8px 16px", // Adjust padding for a nice size
              }}
            >
              <ArrowBack sx={{ marginRight: 1 }} /> {/* Icon for previous */}
            </Button>

            <Button
              variant="contained"
              color="success" // Modern green for "Next Question"
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
              sx={{
                backgroundColor: "rgba(76, 175, 80, 1)", // A fresh green for "Next"
                "&:hover": {
                  backgroundColor: "rgba(76, 175, 80, 0.8)", // Slightly lighter on hover
                },
                borderRadius: "8px", // Rounded corners for a modern look
                padding: "8px 16px", // Adjust padding for a nice size
              }}
            >
              <ArrowForward sx={{ marginLeft: 1 }} /> {/* Icon for next */}
            </Button>
          </Paper>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleEndTest}
          sx={{ marginTop: 3 }}
        >
          End test
        </Button>
      </Container>
    </>
  );
};

export default QuizPage;
