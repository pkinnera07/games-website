import React, { useState, useEffect, useCallback } from 'react';
import './Kakuro.css'; // Import the CSS file


function SumGame() {
  const rows = 4;
  const cols = 4;

  const [grid, setGrid] = useState([]); // Grid with user inputs
  const [solutionGrid, setSolutionGrid] = useState([]); // Grid with fixed values (solution)
  const [congratsMessage, setCongratsMessage] = useState(""); // Message for congrats

  // Function to shuffle an array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  // Function to generate a new puzzle grid
  const generateNewPuzzle =useCallback(() =>  {
    const newGrid = [];
    const solutionGrid = [];
    
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Array of numbers 1 to 9
    shuffleArray(values);

    // Generate the grid with unique random values for the 9 editable cells
    for (let i = 0; i < rows; i++) {
      const row = [];
      const solutionRow = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 && j === 0) {
          // Keep the first cell empty (this can be fixed later if needed)
          row.push({ value: '[■]', fixed: true });
          solutionRow.push({ value: '[■]', fixed: true });
        } else if (i === 0) {
          // First row (except for cell [0,0]) is the sum of the column
          row.push({ value: '', fixed: true });
          solutionRow.push({ value: '', fixed: true });
        } else if (j === 0) {
          // First column (except for cell [0,0]) is the sum of the row
          row.push({ value: '', fixed: true });
          solutionRow.push({ value: '', fixed: true });
        } else {
          // Assign a unique value from the shuffled array to the editable cells
          const value = values.pop(); // Pop the next unique value from the array
          row.push({ value: '', fixed: false });
          solutionRow.push({ value: value, fixed: true }); // Store correct value in solution grid
        }
      }
      newGrid.push(row);
      solutionGrid.push(solutionRow);
    }

    // Assign the sum of rows to the first column and the sum of columns to the first row
    for (let i = 1; i < rows; i++) {
      let rowSum = 0;
      for (let j = 1; j < cols; j++) {
        rowSum += solutionGrid[i][j].value;
      }
      solutionGrid[i][0].value = rowSum; // First cell of each row (except first row) is the row sum
    }

    for (let j = 1; j < cols; j++) {
      let colSum = 0;
      for (let i = 1; i < rows; i++) {
        colSum += solutionGrid[i][j].value;
      }
      solutionGrid[0][j].value = colSum; // First cell of each column (except first column) is the column sum
    }

    // Store the solution grid (fixed values) in state
    setSolutionGrid(solutionGrid);

    // Create a new grid with empty cells for the inner cells
    const emptyGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 || j === 0) {
          // For first row and first column, keep the values as sums
          row.push({ value: solutionGrid[i][j].value, fixed: true });
        } else {
          // For other cells, leave them empty (for user input)
          row.push({ value: '', fixed: false });
        }
      }
      emptyGrid.push(row);
    }

    // Display the empty grid (this is for user interaction)
    setGrid(emptyGrid);
    setCongratsMessage(""); // Clear congrats message when starting a new game
  }, []);

  // Initialize the grid when the component mounts
  useEffect(() => {
    generateNewPuzzle();
  }, [generateNewPuzzle]);

  // Handle input change and check row and column totals
  const handleInputChange = (rowIdx, colIdx, event) => {
    const newGrid = [...grid];
    newGrid[rowIdx][colIdx].value = event.target.value;

    // Check row total
    const rowSum = newGrid[rowIdx].slice(1).reduce((sum, cell) => sum + (parseInt(cell.value, 10) || 0), 0);
    if (rowSum === newGrid[rowIdx][0].value) {
      newGrid[rowIdx][0].green = true;
    } else {
      newGrid[rowIdx][0].green = false;
    }

    // Check column total
    const colSum = newGrid.slice(1).reduce((sum, row) => sum + (parseInt(row[colIdx].value, 10) || 0), 0);
    if (colSum === newGrid[0][colIdx].value) {
      newGrid[0][colIdx].green = true;
    } else {
      newGrid[0][colIdx].green = false;
    }

    // Update the grid state
    setGrid(newGrid);

    // Check if all the first rows and first columns are green
    const allGreen = checkIfAllGreen(newGrid);
    
    if (allGreen) {
      // Turn cell [0,0] green and display congrats message
      newGrid[0][0].green = true;
      setGrid(newGrid);
      setCongratsMessage("Congratulations! You've completed the puzzle!");
    }
  };

  // Function to check if all first rows and columns (except cell[0,0]) are green
  const checkIfAllGreen = (newGrid) => {
    for (let i = 1; i < rows; i++) {
      if (!newGrid[i][0].green) {
        return false;
      }
    }
    for (let j = 1; j < cols; j++) {
      if (!newGrid[0][j].green) {
        return false;
      }
    }
    return true;
  };

  // Hint functionality: Reveal a random empty cell's correct value from the solution grid
  const handleHint = () => {
    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell.fixed && cell.value === '') {
          emptyCells.push({ rowIndex, colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newGrid = [...grid];
      const solutionValue = solutionGrid[randomCell.rowIndex][randomCell.colIndex].value; // Get correct value from solution grid
      newGrid[randomCell.rowIndex][randomCell.colIndex].value = solutionValue; // Reveal the correct value
      setGrid(newGrid);
    }
  };

  return (
    <div className="game-container">
      <div className="kakuro-game-container">
        <table className='kakuro-table'>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    {cell.fixed ? (
                      <div
                        className={`fixed ${cell.green ? 'green' : ''}`}
                      >
                        {cell.value}
                      </div>
                    ) : (
                      <input
                        type="number"
                        value={cell.value}
                        onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
                        min="1"
                        max="9"
                        style={{ width: '50px', height: '50px', textAlign: 'center' }}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="congrats-message">
          {congratsMessage}
      </div>
        <button className='kakuro-button' onClick={generateNewPuzzle}>New Game</button>
        <button className='kakuro-button' onClick={handleHint}>Hint</button>
      </div>
      <div className="rules-container">
        <h2>Game Rules</h2>  
        <ul>
          <li><strong>Grid Structure:</strong> A 3x3 Editable grid consisting of 9 cells. Each cell can contain a number from 1 to 9.</li>
          <li><strong>Initial Numbers:</strong> Values in the First row and First Column indicate the sum of numbers that can be provided in respective Row or Column.</li>
          <li><strong>Valid Grid:</strong> Only numbers between 1 to 9 can be used and each number should be used only once in the grid.</li>
          <li><strong>Valid Numbers in Rows:</strong> Each row must contain the numbers between 1 to 9 whose sum equals to the value in the first row.</li>
          <li><strong>Valid Numbers in Columns:</strong> Each column must contain the numbers between 1 to 9 sum equals to the value in the first column.</li>
          <li><strong>Goal:</strong> The objective is to fill all 9 cells with numbers from 1 to 9 by ensuring valid rows and columns.</li>
        </ul>
        <h2>Buttons Guide</h2>
        <ul>
          <li>Click "Hint" to reveal the correct value of a random empty cell.</li>
          <li>Use the "New Game" button to start a fresh puzzle.</li>
        </ul>
      </div>
    </div>
  );
}

export default SumGame;
