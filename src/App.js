import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import the LandingPage component
import GamePage from "./pages/GamePage";       // Import the GamePage component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game/:name" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
