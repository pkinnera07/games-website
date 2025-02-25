import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'; 
import sudokuImage from '../assets/sudoku.png';
import kakuroImage from '../assets/kakuro.png';
import moreGames from '../assets/moregames.jpg';
import logo from '../assets/logo.png';
import logoText from '../assets/textlogo.png';
import slideSortIcon from '../assets/slidesort.jpg';

// Header component
const Header = ({ onSearch }) => {
  return (
    <div className="header">
      <Link to={LandingPage}>
        <img src={logo} alt="Games Website" className="header-image" />
      </Link>
      <h2 className="website-title">Game Dimension</h2>
      <input 
        className="search" 
        type="text" 
        placeholder="Search Games Here" 
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
      </Link>
    </div>
  );
};

function LandingPage() {
  // State to hold search query
  const [searchQuery, setSearchQuery] = useState("");

  // Array of game data
  const games = [
    { gameName: "Sudoku", gameImage: sudokuImage, gamePath: "/game/Sudoku" },
    { gameName: "Kakuro", gameImage: kakuroImage, gamePath: "/game/Kakuro" },
    { gameName: "Slide & Sort", gameImage: slideSortIcon, gamePath: "/game/Slide & Sort" },
    { gameName: "More Games", gameImage: moreGames, gamePath: "/" }    
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
        <div className="games-grid">
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
