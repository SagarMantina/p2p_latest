import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const CartPurchase = ({ game_name, game_price, setPopUp }) => {
  
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  const handleAddToCart = (game) => {
    dispatch(addToCart(game));
  };

  useEffect(() => {
    if (status === 'added') {

      console.log("Game added to cart successfully!");
      setPopUp(true); // Show popup if the game is successfully added to the cart
    } else if (status === 'rejected') {
      alert(error || 'Error adding game to cart.');
    }
  }, [status, error, setPopUp]);

  const buyGame = () => {
    alert("Please add the game to your cart to buy.");
  };

  return (
    <div className="cartpurchase">
      <h1 style={{ fontWeight: 80 }}>{game_name}</h1>

      <div className="price">
        <p>&#8377; {game_price}</p>
        <button onClick={() => handleAddToCart(game_name)}>Add to Cart</button>
        <button onClick={buyGame}>Buy</button>
      </div>
    </div>
  );
};

export default CartPurchase;
