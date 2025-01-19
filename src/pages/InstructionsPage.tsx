// src/pages/InstructionsPage.tsx
import { Button, Typography, Paper, Container } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const InstructionsPage = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Quiz App!
          </Typography>

          <Typography variant="body1" paragraph>
            This quiz is designed for primary school students. Answer
            multiple-choice questions and race against the timer!
          </Typography>

          <Typography variant="body1" paragraph>
            Follow the instructions, do your best, and have fun!
          </Typography>

          <Link to="/quiz">
            <Button variant="contained" color="primary">
              Start the Quiz
            </Button>
          </Link>
        </Paper>
      </Container>
    </>
  );
};

export default InstructionsPage;
