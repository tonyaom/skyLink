import {
  Typography,
  Paper,
  Container,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { answers, questions } = location.state || {
    answers: [],
    questions: [],
  };

  useEffect(() => {
    if (!answers.length || !questions.length) {
      navigate("/quiz");
    }
  }, [answers, questions, navigate]);

  const score = answers.reduce((acc: number, answer: string, index: number) => {
    if (answer === questions[index].answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const handleTryAgain = () => {
    navigate("/quiz");
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Quiz Results
          </Typography>
          <Typography variant="h6" gutterBottom>
            You scored {score} out of {questions.length}
          </Typography>
          {score === questions.length ? (
            <Typography variant="body1" color="success.main">
              Perfect Score! Congratulations!
            </Typography>
          ) : (
            <Typography variant="body1" color="error.main">
              Better luck next time.
            </Typography>
          )}

          {/* Try Again Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleTryAgain}
            sx={{ marginTop: 2 }}
          >
            Try Again
          </Button>

          {/* Optionally show the answers list */}
          <List sx={{ marginTop: 2 }}>
            {answers.map((answer: string, index: number) => (
              <ListItem key={index}>
                <Typography variant="body2">
                  Question {index + 1}: {answer} (Correct answer:{" "}
                  {questions[index].answer})
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default ResultsPage;
