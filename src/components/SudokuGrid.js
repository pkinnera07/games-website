import React, { useState, useEffect } from "react";
import './SudokuGrid.css'; // Optional: Create and link CSS for Sudoku styling
import puzzleData from './sudoku.json'; // Import JSON containing puzzles

function SudokuGrid() {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill("")));
  const [fixedCells, setFixedCells] = useState(Array(9).fill(Array(9).fill(false))); // Track fixed cells
  const [feedback, setFeedback] = useState(""); // For the check result
  const [invalidRows, setInvalidRows] = useState([]); // To track invalid rows
  const [invalidCols, setInvalidCols] = useState([]); // To track invalid columns
  const [invalidSubgrid, setInvalidSubgrid] = useState(false); // To track invalid subgrid

  useEffect(() => {
    // Load a random puzzle when the component mounts
    loadPuzzle();
  }, []);

  const loadPuzzle = () => {
    const randomPuzzle = puzzleData[Math.floor(Math.random() * puzzleData.length)].grid;
    const newGrid = [];
    const newFixedCells = [];

    // Create the grid from the string (0 indicates empty cells)
    for (let i = 0; i < 9; i++) {
      const row = randomPuzzle.slice(i * 9, (i + 1) * 9).split("").map(val => val === "0" ? "" : val);
      const fixedRow = row.map(val => val !== ""); // Track if the cell is pre-filled

      newGrid.push(row);
      newFixedCells.push(fixedRow);
    }

    setGrid(newGrid);
    setFixedCells(newFixedCells);
  };

  const handleChange = (e, row, col) => {
    // Allow changes to cells that are not fixed (empty cells)
    if (!fixedCells[row][col]) {
      const newGrid = grid.map((r, i) =>
        i === row
          ? r.map((c, j) => (j === col ? e.target.value : c))
          : r
      );
      setGrid(newGrid);
    }
  };

  const checkLine = (arr) => {
    let unique = new Set(arr);
    return unique.size === 9 && !arr.includes("");
  };

  const checkGrid = () => {
    let result = "<b>Checking Sudoku...</b><br>";

    let invalidRows = [];
    let invalidCols = [];

    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      let row = grid[i];
      let col = grid.map((row) => row[i]);

      if (!checkLine(row)) {
        invalidRows.push(i);
      }
      if (!checkLine(col)) {
        invalidCols.push(i);
      }
    }

    // Check 3x3 subgrids
    let invalidSubgrid = false;
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        let subgrid = [];
        for (let i = row; i < row + 3; i++) {
          for (let j = col; j < col + 3; j++) {
            subgrid.push(grid[i][j]);
          }
        }
        if (new Set(subgrid).size !== 9 || subgrid.some((val) => val < 1 || val > 9)) {
          invalidSubgrid = true;
        }
      }
    }

    result += invalidSubgrid
      ? "<span style='color: red;'>Error Highlighted</span><br>"
      : "<span style='color: green;'>CONGRATULATIONS!! Puzzle solved</span><br>";

    return { result, invalidRows, invalidCols, invalidSubgrid };
  };

  const handleCheck = () => {
    const { result, invalidRows, invalidCols, invalidSubgrid } = checkGrid();

    // Only set feedback after the check
    setFeedback(result);
    // Save the invalid rows and columns for highlighting
    setInvalidRows(invalidRows);
    setInvalidCols(invalidCols);
    setInvalidSubgrid(invalidSubgrid);

    // Set a timeout to reset invalid highlighting after 3 seconds
    setTimeout(() => {
      resetInvalidCells();
    }, 3000); // 3 seconds delay
  };

  const resetInvalidCells = () => {
    // Reset the invalid cells after the 3-second timeout
    setInvalidRows([]);
    setInvalidCols([]);
    setInvalidSubgrid(false);
  };

  return (
    <div className="game-container">
      <div className="sudoku-container">
        <table className="sudoku-grid-table">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      value={cell}
                      min="1"
                      max="9"
                      onChange={(e) => handleChange(e, rowIndex, colIndex)}
                      className={
                        // Highlight invalid rows or columns and fixed cells
                        `${(invalidRows.includes(rowIndex) || invalidCols.includes(colIndex)) ? "invalid" : ""} ${fixedCells[rowIndex][colIndex] ? "fixed" : ""}`
                      }
                      maxLength="1" // Allow only single digit input
                      disabled={fixedCells[rowIndex][colIndex]} // Disable input if the cell is pre-filled
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleCheck} className="sudoku-button">Check</button>
        <button onClick={loadPuzzle} className="sudoku-button">New Sudoku</button>
        <p dangerouslySetInnerHTML={{ __html: feedback }}></p>
      </div>
      <div className="rules-container">
        <h2>Game Rules</h2>
        <ul>
          <li><strong>Grid Structure:</strong> A 9x9 grid consisting of 81 cells. Each cell can contain a number from 1 to 9.</li>
          <li><strong>Sub-Grids:</strong> The grid is divided into 9 smaller 3x3 sub-grids.</li>
          <li><strong>Initial Numbers:</strong> Some cells are pre-filled with numbers and cannot be changed.</li>
          <li><strong>Valid Numbers in Rows:</strong> Each row must contain the numbers 1 to 9, without repetition.</li>
          <li><strong>Valid Numbers in Columns:</strong> Each column must also contain the numbers 1 to 9, with no duplicates.</li>
          <li><strong>Valid Numbers in Sub-Grids:</strong> Each 3x3 sub-grid must contain the numbers 1 to 9, with no duplicates.</li>
          <li><strong>No Duplicates:</strong> A number can appear only once in each row, column, and sub-grid.</li>
          <li><strong>Goal:</strong> The objective is to fill in the empty cells such that every row, column, and sub-grid contains the numbers 1-9 without repetition.</li>
        </ul>
        <h2>Buttons Guide</h2>
        <ul>
          <li>Click to check if the filled sudoku is <strong>Valid</strong></li>
          <li>Use the <strong>"New Game"</strong> button to start a <strong>fresh Sudoku</strong>.</li>
        </ul>
      </div>
    </div>
  );
}

export default SudokuGrid;
