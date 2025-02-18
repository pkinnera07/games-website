import React from "react";
import { useParams } from "react-router-dom";
import SudokuGrid from "../components/SudokuGrid"; // Import SudokuGrid component
import SumGame from "../components/SumGame"; // Import SudokuGrid component

function GamePage() {
  const { name } = useParams(); // Get the game name from the URL
  console.log(name);


  return (
    <div className="game-page">
      <h1>Welcome to the {name} game page!</h1>
      {/* Conditionally render SudokuGrid if the game is Sudoku */}
      {name === "sudoku" && <SudokuGrid />}
      
      {/* Conditionally render SumGame if the game is Sum Game */}
      {name === "sumGame" && <SumGame />}
    </div>
  );
}

export default GamePage;
