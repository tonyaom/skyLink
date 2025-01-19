// src/Routes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import InstructionsPage from './pages/InstructionsPage';
import ResultsPage from './pages/ResultsPage';
import Login from './pages/Login';
import NasaImages from './pages/NasaImages';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/quiz-instruction" element={<InstructionsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/nasa-images" element={<NasaImages />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
