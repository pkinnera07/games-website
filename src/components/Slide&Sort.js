import React, { useState, useEffect } from 'react';
import './Slide&Sort.css';

const Game = () => {
  const [blocks, setBlocks] = useState([]);
  const [emptyCell, setEmptyCell] = useState(null);
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
    const clickedBlock = blocks[index];

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
      <button onClick={initializeGrid}>Reset</button>
      <div className="congrats">{congratsMessage}</div>
    </div>
  );
};

export default Game;
