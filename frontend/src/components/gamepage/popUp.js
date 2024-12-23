import React from 'react'
import './popup.css'
import CartCard from '../cartpage/CartCard';
import { Link } from "react-router-dom";

const PopUp = ({game_image, game_name,game_price,onClose}) => {
  return (
    <div className='popUp'>
      <p className='closeBtn' onClick={onClose}>X</p>
        <h1>Added to your cart!</h1>
        <CartCard game_image={game_image} game_name={game_name} game_price={game_price} />

        <div className='popcontrols'>
            <button onClick={onClose}>Continue Shopping</button>
            <button><Link to='/cart'>view My Cart</Link></button>
        </div>
    </div>
  )
}

export default PopUp