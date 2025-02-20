import React, { useState, useEffect } from 'react';
import './Kakuro.css'; // Import the CSS file

function SumGame() {
  const rows = 4;
  const cols = 4;

  const [grid, setGrid] = useState([]);

  // Function to shuffle an array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  // Function to generate a new puzzle grid
  const generateNewPuzzle = () => {
    const newGrid = [];
    
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Array of numbers 1 to 9
    shuffleArray(values); // Shuffle the values array to randomize the order

    // Generate the grid with unique random values for the 9 editable cells
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 && j === 0) {
          // Keep the first cell empty
          row.push({ value: '[■]', fixed: true });
        } else if (i === 0) {
          // First row (except for cell [0,0]) is the sum of the column
          row.push({ value: '', fixed: true });
        } else if (j === 0) {
          // First column (except for cell [0,0]) is the sum of the row
          row.push({ value: '', fixed: true });
        } else {
          // Assign a unique value from the shuffled array to the editable cells
          const value = values.pop(); // Pop the next unique value from the array
          row.push({ value: value, fixed: false });
        }
      }
      newGrid.push(row);
    }

    // Assign the sum of rows to the first column and the sum of columns to the first row
    for (let i = 1; i < rows; i++) {
      let rowSum = 0;
      for (let j = 1; j < cols; j++) {
        rowSum += newGrid[i][j].value;
      }
      newGrid[i][0].value = rowSum; // First cell of each row (except first row) is the row sum
    }

    for (let j = 1; j < cols; j++) {
      let colSum = 0;
      for (let i = 1; i < rows; i++) {
        colSum += newGrid[i][j].value;
      }
      newGrid[0][j].value = colSum; // First cell of each column (except first column) is the column sum
    }

    setGrid(newGrid);

     // Create a new grid with empty cells for the inner cells
     const emptyGrid = [];
     for (let i = 0; i < rows; i++) {
         const row = [];
         for (let j = 0; j < cols; j++) {
             if (i === 0 || j === 0) {
                 // For first row and first column, keep the values as sums
                 row.push({ value: newGrid[i][j].value, fixed: true });
             } else {
                 // For other cells, leave them empty (for user input)
                 row.push({ value: '', fixed: false });
             }
         }
         emptyGrid.push(row);
     }

     // Display the empty grid
    setGrid(emptyGrid);

  };

  // Initialize the grid when the component mounts
  useEffect(() => {
    generateNewPuzzle();
  }, []);

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

    setGrid(newGrid);
  };

  // Function to solve the puzzle by filling in the correct values
  const solvePuzzle = () => {
    const solvedGrid = grid;

    setGrid(solvedGrid);
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
        <button className='sumGame-button' onClick={generateNewPuzzle}>New Game</button>
        <button className='sumGame-button' onClick={solvePuzzle}>Solve</button>
      </div>
      <div className="rules-container">
        <h2>Kakuro Game Rules</h2>
  
        <h3>Objective:</h3>
        <p>Fill the grid with numbers from <strong>1 to 9</strong> so that:</p>
        <ul>
          <li>The sum of numbers in each row matches the row total.</li>
          <li>The sum of numbers in each column matches the column total.</li>
          <li>No number is repeated in any row or column.</li>
        </ul>

        <h3>How to Play:</h3>
        <ol>
          <li><strong>Grid Layout:</strong> The first row and the first column contain sum clues. The inner cells are empty and need to be filled with numbers.</li>
          <li><strong>Fill the Cells:</strong> Enter numbers <strong>1 to 9</strong> in the empty cells. Each number can appear <strong>only once</strong> in each row and column.</li>
          <li><strong>Row and Column Totals:</strong> The first column shows the sum for each row (excluding the first cell). The first row shows the sum for each column (excluding the first cell).</li>
        </ol>

        <h3>Solve the Puzzle:</h3>
        <ul>
          <li>Click "Solve" to view the correct solution.</li>
          <li>Use the "New Game" button to start a fresh puzzle.</li>
        </ul>

        <h3>Winning:</h3>
        <p>You win when all the cells are correctly filled and the row and column sums are correct!</p>
      </div>
    </div>
  );
}

export default SumGame;
