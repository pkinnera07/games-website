import React from "react";
import { useParams } from "react-router-dom";
import SudokuGrid from "../components/SudokuGrid"; // Import SudokuGrid component
import Kakuro from "../components/Kakuro"; // Import SudokuGrid component
import SlideSort from "../components/Slide&Sort"; // Import SudokuGrid component
import headerIcon from '../assets/headericon.png';


function GamePage() {
  const { name } = useParams(); // Get the game name from the URL
  console.log(name);

const Header = () => {
  return (
    <div className="header">
      <img src={headerIcon} alt="Games Website" className="header-image" />
      <h1 className="website-title">{name}</h1>
    </div>
  );
};
  return (
    
    <div className="game-page">
      <Header />
      {/* Conditionally render SudokuGrid if the game is Sudoku */}
      {name === "sudoku" && <SudokuGrid />}
      
      {/* Conditionally render SumGame if the game is Sum Game */}
      {name === "kakuro" && <Kakuro />}

      {/* Conditionally render Slide & Sort if the game is Slide & Sort */}
      {name === "slide&sort" && <SlideSort />}

    </div>
  );
}

export default GamePage;
