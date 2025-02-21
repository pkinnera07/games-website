import React from "react";
import { useParams, useNavigate  } from "react-router-dom";
import SudokuGrid from "../components/SudokuGrid"; // Import SudokuGrid component
import Kakuro from "../components/Kakuro"; // Import SudokuGrid component
import SlideSort from "../components/Slide&Sort"; // Import SudokuGrid component
import logo from '../assets/logo.png';

function GamePage() {
  const { name } = useParams(); // Get the game name from the URL
  console.log(name);

  const navigate = useNavigate();

  const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Games Website" className="header-image" onClick={() => navigate("/")}/>     
      <h1 className="game-title">{name}</h1>
      <button className="back-button" onClick={() => navigate("/")}>Home</button> {/* Back button */}
    </div>
  );
};
  return (
    
    <div className="game-page">
      <Header />
      {/* Conditionally render SudokuGrid if the game is Sudoku */}
      {name === "Sudoku" && <SudokuGrid />}
      
      {/* Conditionally render SumGame if the game is Sum Game */}
      {name === "Kakuro" && <Kakuro />}

      {/* Conditionally render Slide & Sort if the game is Slide & Sort */}
      {name === "Slide & Sort" && <SlideSort />}

    </div>
  );
}

export default GamePage;
