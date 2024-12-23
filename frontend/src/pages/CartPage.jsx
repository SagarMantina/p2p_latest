
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../components/cartpage/CartCard';
import './CartPage.css';
import { LoadingScreen } from '../components/LoadingScreen';
import { Link } from 'react-router-dom';
import Header from './Header'
import {
  fetchCartGames,
  removeFromCart,
} from '../redux/slices/cartSlice';
import Footer from './Footer';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, status, error } = useSelector((state) => state.cart);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, game) => sum + game.price, 0);

  useEffect(() => {
    dispatch(fetchCartGames());
  }, [dispatch]);

  const handleRemoveGame = (game) => {
    dispatch(removeFromCart(game));
  };

  const handleRemoveAllGames = () => {
    cart.forEach((game) => {
      dispatch(removeFromCart(game.game_name));
    });
  };

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
   <>
   <Header />
   <div className="cartPage">
      <h1>Your Shopping Cart</h1>
      <div className="cartpagemain">
        <div className="cartgames">
          {cart.length > 0 ? (
            cart.map((game, index) => (
              <div key={index}>
                <CartCard
                  game_image={game.main_image}
                  game_name={game.game_name}
                  game_price={game.price}
                  removeGame={() => handleRemoveGame(game.game_name)}
                />
              </div>
            ))
          ) : (
            <div className="emptycart">
              <video src="/EmptyCart.mp4" autoPlay loop muted />
              <p>Your cart is Empty</p>
              <p>Looks like you haven't made your choice yet.</p>
              <button>
                <Link to="/">Start Shopping</Link>
              </button>
            </div>
          )}

          {cart.length > 0 && (
            <div className="cartcontrols">
              <button> <Link to='/'>Continue Shopping</Link> </button>
              <p onClick={handleRemoveAllGames}>Remove all Items</p>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="paymentcard">
            <div className="estimatedTotal">
              <h3 style={{ fontWeight: '10' }}>Estimated Price</h3>
              <p>&#8377;{totalAmount}</p>
            </div>
            <p style={{ color: 'gray', width: '70%', fontSize: '15px' }}>
              Sales tax will be calculated during checkout where applicable
            </p>
            <button className="paymentBtn">
              <Link to="/payment">Continue to Payment</Link>
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
   </>
  );
};

export default CartPage;
