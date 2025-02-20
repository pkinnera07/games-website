import React, { useState, useEffect } from 'react';
import './Slide&Sort.css';

const Game = () => {
  const [blocks, setBlocks] = useState([]);
  //const [emptyCell, setEmptyCell] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState('');

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    let newBlocks = [];

    // Create the grid and assign numbers
    for (let i = 0; i < 9; i++) {
      if (i < 8) {
        newBlocks.push({ id: i, value: numbers[i], isEmpty: false });
      } else {
        newBlocks.push({ id: i, value: null, isEmpty: true });
      }
    }

    setBlocks(newBlocks);
    shuffleGrid(newBlocks);
    setCongratsMessage('');
  };

  const shuffleGrid = (newBlocks) => {
    let shuffleMoves = 50; // Number of moves to shuffle
    let shuffledBlocks = [...newBlocks];

    for (let i = 0; i < shuffleMoves; i++) {
      const possibleMoves = getPossibleMoves(shuffledBlocks);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      shuffledBlocks = moveEmptyCell(shuffledBlocks, randomMove);
    }

    setBlocks(shuffledBlocks);
  };

  const getPossibleMoves = (blocks) => {
    const emptyIndex = blocks.findIndex(block => block.isEmpty);
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    const moves = [];
    // Up, Down, Left, Right
    if (emptyRow > 0) moves.push(emptyIndex - 3); // Up
    if (emptyRow < 2) moves.push(emptyIndex + 3); // Down
    if (emptyCol > 0) moves.push(emptyIndex - 1); // Left
    if (emptyCol < 2) moves.push(emptyIndex + 1); // Right

    return moves;
  };

  const moveEmptyCell = (blocks, newIndex) => {
    const emptyIndex = blocks.findIndex(block => block.isEmpty);
    const updatedBlocks = [...blocks];

    // Swap the empty block with the new block
    [updatedBlocks[emptyIndex], updatedBlocks[newIndex]] = [updatedBlocks[newIndex], updatedBlocks[emptyIndex]];

    // Update the empty cell position
    updatedBlocks[emptyIndex].isEmpty = false;
    updatedBlocks[newIndex].isEmpty = true;

    // Update the blocks state
    return updatedBlocks;
  };

  const moveBlock = (index) => {
    const emptyIndex = blocks.findIndex(block => block.isEmpty);
    //const clickedBlock = blocks[index];

    const clickedRow = Math.floor(index / 3);
    const clickedCol = index % 3;

    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    // Check if the clicked block is adjacent to the empty block
    const isAdjacent =
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

    // If the block is adjacent to the empty block, swap the blocks
    if (isAdjacent) {
      const updatedBlocks = moveEmptyCell(blocks, index);
      setBlocks(updatedBlocks);

      // Check if the puzzle is solved after moving
      checkWin(updatedBlocks);
    }
  };

  const checkWin = (blocks) => {
    let isSolved = true;
    blocks.forEach((block, index) => {
      if (!block.isEmpty && block.value !== index + 1) {
        isSolved = false;
      }
    });

    // If solved, display the congratulatory message
    if (isSolved) {
      setCongratsMessage('Congratulations! You solved the puzzle!');
    }
  };

  return (
    <div className='game-container'>
      <div className="slidesort-container">
        <div className="grid">
          {blocks.map((block, index) => (
            <div
              key={index}
              className={`block ${block.isEmpty ? 'empty' : ''}`}
              onClick={() => !block.isEmpty && moveBlock(index)}
            >
              {block.isEmpty ? '' : block.value}
            </div>
          ))}
        </div>
        <button className="slidesort-button" onClick={initializeGrid}>Reset</button>
        <div className="congrats">{congratsMessage}</div>
      </div>
      <div className="rules-container">
        <h2>Game Rules</h2>  
        <ul>
          <li><strong>Grid Structure:</strong> A 3x3 grid consisting of 9 cells. 8 of these cells contain numbered blocks (1 to 8), and one cell is empty.</li>
          <li><strong>Objective:</strong> The goal is to slide the numbered blocks into the correct order, from 1 to 8, by moving them into the empty cell. The empty cell allows you to move adjacent blocks.</li>
          <li><strong>Initial State:</strong> The puzzle starts with the blocks shuffled randomly, and one cell is empty.</li>
          <li><strong>Valid Moves:</strong> A block can be moved into the empty space if it is adjacent to the empty cell (up, down, left, or right).</li>
          <li><strong>Winning Condition:</strong> The puzzle is solved when the blocks are arranged in the correct numerical order, from 1 to 8, with the empty space in the last position.</li>
          <li><strong>Reset:</strong> Press the "Reset" button to start a new shuffled puzzle.</li>
        </ul>
        <h2>Buttons Guide</h2>
        <ul>
          <li>Click any numbered block to move it into the empty cell if it is adjacent.</li>
          <li>Use the "Reset" button to shuffle the puzzle and start over.</li>
        </ul>
      </div>

    </div>
  );
};

export default Game;
