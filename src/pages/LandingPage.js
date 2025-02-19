import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import sudokuImage from '../assets/sudoku.png';
import kakuroImage from '../assets/kakuro.png';
import headerIcon from '../assets/headericon.png';
import slideSortIcon from '../assets/slide&sort.png';


// Header component
const Header = () => {
  return (
    <div className="header">
      <img src={headerIcon} alt="Games Website" className="header-image" />
      <h2 className="website-title">Game Zone</h2>
      <input className="search" type="text" placeholder="Search your Favourite Game"></input>
      <FontAwesomeIcon icon={faSearch} size="lg" className="search-icon"/>
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
  return (
    <div className="landing-page">
      <Header />

      <h1>Welcome to the Game Website</h1>
      <div className="game-grid">
        <GameBlock 
          gameName="Sudoku" 
          gameImage={sudokuImage}
          gamePath="/game/sudoku" 
        />
        <GameBlock 
          gameName="Kakuro"
          gameImage={kakuroImage}
          gamePath="/game/kakuro" 
        />
        <GameBlock 
          gameName="Slide & Sort"
          gameImage={slideSortIcon}
          gamePath="/game/slide&sort" 
        />
      </div>
    </div>
  );
}

export default LandingPage;
