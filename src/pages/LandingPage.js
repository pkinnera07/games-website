import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'; 
import sudokuImage from '../assets/sudoku.png';
import kakuroImage from '../assets/kakuro.png';
import logo from '../assets/logo.png';
import logoText from '../assets/logotext.png';
import slideSortIcon from '../assets/slide&sort.png';

// Header component
const Header = ({ onSearch }) => {
  return (
    <div className="header">
      <img src={logo} alt="Games Website" className="header-image" />
      <h2 className="website-title">Game Dimension</h2>
      <input 
        className="search" 
        type="text" 
        placeholder="Search your Favourite Game" 
        onChange={e => onSearch(e.target.value)} // Trigger search on input change
      />
    </div>
  );
};

// Game block component
const GameBlock = ({ gameName, gameImage, gamePath }) => {
  return (
    <div className="game-block">
      <Link to={gamePath}>
        <img src={gameImage} alt={gameName} className="game-image" />
        <h3>{gameName}</h3>
      </Link>
    </div>
  );
};

function LandingPage() {
  // State to hold search query
  const [searchQuery, setSearchQuery] = useState("");

  // Array of game data
  const games = [
    { gameName: "Sudoku", gameImage: sudokuImage, gamePath: "/game/sudoku" },
    { gameName: "Kakuro", gameImage: kakuroImage, gamePath: "/game/kakuro" },
    { gameName: "Slide & Sort", gameImage: slideSortIcon, gamePath: "/game/slide&sort" }
  ];

  // Filter games based on search query (case-insensitive)
  const filteredGames = games.filter(game =>
    game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landing-page">
      <Header onSearch={setSearchQuery} /> {/* Pass search handler to Header */}
      <div className="site-layout">
        <div className="captions">
          <h1 className="welcome">Welcome to</h1>
          <img src={logoText} alt="Games Website" className="logo-image" />
        </div>
        <div className="game-grid">
          {filteredGames.map((game, index) => (
            <GameBlock 
              key={index} 
              gameName={game.gameName} 
              gameImage={game.gameImage} 
              gamePath={game.gamePath} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
