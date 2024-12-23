import React, { useState, useEffect } from 'react';
import ImageContainer from '../components/gamepage/ImageContainer';
import InfoContainer from '../components/gamepage/InfoContainer';
import About from '../components/gamepage/About';
import CartPurchase from '../components/gamepage/CartPurchase';
import Reviews from '../components/gamepage/Reviews';
import CompareGames from '../components/gamepage/CompareGames';
import PopUp from '../components/gamepage/popUp';
import { LoadingScreen } from '../components/LoadingScreen';
import './GamePage.css';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const GamePage = () => {
  const [gameDetails, setGameDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [popup, setPopUp] = useState(false);
  const [error, setError] = useState(null);
  
  const { gamename } = useParams();
  useEffect(() => {
    
    const fetchGame = async () => {
      try {
        const response = await fetch(`${baseUrl}/clickgame/${gamename}`);
        if (!response.ok) {
          throw new Error('Failed to fetch game data');
        }
        const gameData = await response.json();
        setGameDetails(gameData);
        setCurrentImage(gameData.main_image)
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gamename]); 
   
  const [comparegames, setCompareGames] = useState([]);

  useEffect(() => {
    const fetchComparegames = async () => {
      try {
        const response = await fetch(`${baseUrl}/comparisons/${gamename}`);
        if (!response.ok) {
          throw new Error('Failed to fetch game data');
        }
        const gameData = await response.json();
        console.log(gameData)
        setCompareGames(gameData);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false);
      }
    };
    fetchComparegames();
  }, [comparegames]);
 

  
  

  const popCloseHandler = () => {
    setPopUp(false);
  };

  const handleMouseEnter = (image) => {
    setCurrentImage(image);
  };

  const handleMouseLeave = () => {
    setCurrentImage(gameDetails.main_image);
  };

  useEffect(() => {
    if (popup) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }

    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [popup]);


  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Header />
      <main className={`gamePage ${popup ? 'blurred' : ''}`}>
        <h1>{gameDetails.game_name}</h1>
        <div className="image_info">
          <ImageContainer
            game_details={gameDetails}
            currentImage={currentImage}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
          <InfoContainer game_details={gameDetails} />
        </div>
        <CartPurchase
          game_name={gameDetails.game_name}
          game_price={gameDetails.price}
          game_image={gameDetails.main_image}
          setPopUp={setPopUp}
        />
        <About game_details={gameDetails} />
        <CompareGames games={comparegames} />
        <Reviews reviews={gameDetails.reviews} curr_rating={gameDetails.rating} />

      </main>
      {popup && (
        <div className="popupOverlay" onClick={popCloseHandler}>
          <div
            className="popupContent"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the popup from closing it
          >
            <PopUp
              game_image={gameDetails.main_image}
              game_name={gameDetails.game_name}
              game_price = {gameDetails.price}
              onClose={popCloseHandler}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default GamePage;
