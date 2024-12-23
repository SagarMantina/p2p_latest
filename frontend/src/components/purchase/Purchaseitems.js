import React, { useState } from 'react';
import ReviewItems from './ReviewItems';
import './PurchaseItem.css';
import {fetchCartGames} from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const Purchaseitems = ({  onPayment }) => {
  // const [selectedOption, setSelectedOption] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  // const [friendUsername, setFriendUsername] = useState('');

  const dispatch = useDispatch();
  const { cart} = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCartGames());
  }, [dispatch]);

  // Calculate the total price directly from the games array
  const total = cart.reduce((sum, game) => sum + game.price, 0);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  const username = getCookie('username');
  const buycartGame = async () => {
    console.log('Buying cart games...');
    try {
      const response = await fetch(`${baseUrl}/cartpaygame`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        onPayment()
      } else {
        alert(data.errorMessage || 'Error completing the purchase');
      }
    } catch (error) {
      console.error('Error purchasing games:', error);
      alert('Error processing the purchase');
    }
  };

  // const handleUsernameChange = (event) => {
  //   setFriendUsername(event.target.value);
  // };

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  return (
    <div className='purchaseitems'>
      <div className='items'>

      {console.log(cart)}
        {cart.length > 0 ? cart.map((game, index) => (
          <ReviewItems
            key={index}
            game_image={game.main_image}
            game_name={game.name}
            game_price={game.price}
          />
        )) : (
          <p>No games in cart</p>
        )}
      </div>

      <div className='cost'>
        <div className='subtotal'>
          <p>Subtotal :</p>
          <p>&#8377; {total}</p>
        </div>
        <div className='tax'>
          <p style={{ position: 'relative', left: '9%' }}>Tax :</p>
          <p>&#8377; 0</p>
        </div>
        <hr style={{ color: 'white' }} />
        <div className='total'>
          <p>Total :</p>
          <p>&#8377; {total}</p>
        </div>
      </div>

      <div className='finalpayment'>
        <div className='accountinfo'>
          <p>payment method : </p>
          <p style={{ color: 'greenyellow' }}>Credit card</p>
        </div>
        {/* <div className='accountinfo'>
          <p>Gift Options :</p>
          <select
            name='giftOptions'
            id='giftOptions'
            value={selectedOption}
            onChange={handleChange}
          >
            <option value='none'>None, this purchase is for your own account</option>
            <option value='friend'>Friend</option>
          </select>
        </div> */}
        {/* {selectedOption === 'friend' && (
          <div className='accountinfo'>
            <label htmlFor='friendUsername'>Friend's Username :</label>
            <input
              type='text'
              id='friendUsername'
              name='friendUsername'
              value={friendUsername}
              onChange={handleUsernameChange}
              placeholder="Enter friend's username"
              style={{
                border: 'none',
                marginTop: '5px',
                width: '30%',
                boxSizing: 'border-box',
                backgroundColor: 'rgb(13,19,27,255)',
                color: 'greenyellow',
                boxShadow: '2px 2px #417a9b',
              }}
            />
          </div>
        )} */}
        <div className='accountinfo'>
          <p>P2P account Name:</p>
          <p style={{ color: 'greenyellow' }}>{username}</p>
        </div>
      </div>
      <div className='agree_submit'>
        <div style={{ marginTop: '20px' }}>
          <input
            type='checkbox'
            id='agreeTerms'
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='agreeTerms' style={{ color: 'white' }}>
            I agree to the <span style={{ color: 'yellow' }}>terms and conditions</span> of payment.
          </label>
        </div>
        <p>Click below button to continue the transaction</p>

        <button className='submitBtn' onClick={buycartGame} disabled={!isAgreed}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Purchaseitems;
