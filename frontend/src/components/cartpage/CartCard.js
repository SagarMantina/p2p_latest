  import React from 'react'
import './CartCard.css'
import MainFrame from '../gamepage/MainFrame'
import { FaWindows , FaApple} from 'react-icons/fa6'




const CartCard = ({game_image,game_name,game_price,removeGame }) => {

  return (
    <div className='cartcard'>
    <MainFrame main_image={game_image} />
    <div className='cartinfo'>
      <p style={{ fontSize: 'large' }}>{game_name}</p>
      <div className='Icons'>
      <FaWindows  />
      <FaApple />
      </div>
      <p>&#8377;{game_price}</p>
      <p className='removeItm' onClick={removeGame}>Remove</p>
    </div>
  </div>
  )
}

export default CartCard