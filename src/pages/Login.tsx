import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Z8kVTfZ1UTJd8M7");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "test@test.com" && password === "Z8kVTfZ1UTJd8M7") {
      navigate("/nasa-images"); 
    } else {
      console.log("Invalid login credentials");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textTransform: "uppercase",
            }}
          >
            SkyLink
          </Typography>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </form>
      </Paper>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "normal",
          color: "text.primary",
          textTransform: "none",
          marginTop: "10px",
        }}
      >
        For demonstration purposes, please use the following credentials: Email:
        test@test.com Password: Z8kVTfZ1UTJd8M7
      </Typography>
    </Container>
  );
};

export default LoginPage;
