
import './GameCard.css';
import React from 'react';
import { FaWindows, FaApple } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const GameCard = ({ game_details, addToCart }) => {
  const navigate = useNavigate();

  const fetchGamePage = (game_name) => {
    console.log(game_name);
    navigate(`/game/${game_name}`);
  };

  const handleCart = async (game_name) => {
    try {
        const response = await fetch(`${baseUrl}/addtocart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart_games: { game_name } }), // Sending an object containing game_name
            credentials: 'include',
        });

        if (response.ok) {
            // const data = await response.json();
            // alert(data.successMsg || 'Game added to cart successfully!');
           alert("Game added to cart successfully!");
        } else {
            const errorData = await response.json();
            alert(errorData.errorMessage || 'Error adding game to cart.');
        }
    } catch (error) {
        console.log(error);
        alert('Error adding game to cart.');
    }
};
  return (
    <div className="gameCard"  >
      <div className="gameCardImage">
        <img src={game_details.main_image} alt={game_details.name} onClick={() => fetchGamePage(game_details.game_name)} />
      </div>

      <div className="gameCardInfo">
        <p onClick={() => fetchGamePage(game_details.game_name)}>{game_details.game_name}</p>
        <span onClick={() => fetchGamePage(game_details.game_name)}>
          {game_details.releaseDate} <span> </span>
          <FaWindows /> <span> </span>
          <FaApple />
        </span>
        <p>
          <span style={{ color: 'greenyellow' }}>Very Positive</span> |{' '}
          {game_details.reviews.length} User Reviews
        </p>
      </div>

      <div className="gameCardPrice">
        <p className="price">&#8377;{game_details.price}</p>
        <p className="cart" onClick={() => handleCart(game_details.game_name)}>
          Add to cart
        </p>
      </div>
    </div>
  );
};

export default GameCard;
