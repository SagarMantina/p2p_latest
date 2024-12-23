
import React, { useEffect, useState } from 'react';
import GameCard from '../components/resultpage/GameCard';
import { LoadingScreen } from '../components/LoadingScreen';
import styles from './ResultPage.module.css';
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; // Adjust the path to match your project structure
import Header from './Header';
import Footer from './Footer'
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const ResultPage = () => {
    const [searchedGames, setSearchedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    
    // Get the search term from the URL query parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('term') || '';

    useEffect(() => {
        const fetchSearchedGames = async () => {
            try {
                const response = await fetch(`${baseUrl}/searchgames?term=${searchTerm}`);
                const data = await response.json();
                setSearchedGames(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(() => {
            (async () => await fetchSearchedGames())();
        }, 3000);
    }, [searchTerm]); // Add searchTerm as a dependency to re-run when it changes

    const handleAddToCart = async (game) => {
        const result = await dispatch(addToCart(game));
        if (addToCart.fulfilled.match(result)) {
            toast.success(result.payload.successMsg || "Your game is added to cart!", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            toast.error(result.payload || "Failed to add game to cart.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
       <>
        <Header />
        <div className={styles['resultpage']}>
            <h1>Searched Category Games</h1>
            <div className={styles['result']}>
                {searchedGames.length > 0 ? (
                    searchedGames.map((game) => (
                        <GameCard key={game.id} game_details={game} addToCart={handleAddToCart} />
                    ))
                ) : (
                    <p>Please search for a valid game</p>
                )}
            </div>

            <ToastContainer />
        </div>
        <Footer />
       </>
    );
};

export default ResultPage;
