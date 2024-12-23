


import React, { useState, useEffect } from 'react';
import GameCard from '../resultpage/GameCard';
import '../../styles/Games.css';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const UserGames = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 10;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${baseUrl}/seller/mygames`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials for sending cookies
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging step
  
        // Access the array within the `myGames` property
        const gamesArray = Array.isArray(data.myGames) ? data.myGames : [];
  
        if (gamesArray.length === 0) {
          alert('No games available at the moment.');
        }
  
        setGames(gamesArray);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
  
    fetchGames();
  }, []);
  
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = games.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < games.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="games-page">
      <h1>Games List</h1>
      <div className="gameslist">
        {currentGames.map((game) => (
          <GameCard key={game._id} game_details={game} showcart={false} />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ color: 'white' }}>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={endIndex >= games.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserGames;
