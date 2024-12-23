import React from 'react'
import { FaWindows , FaApple} from 'react-icons/fa6'
import './ReviewItem.css'

const ReviewItems = ({game_image,game_name,game_price}) => {
  return (
    <div className='reviewitems'>
        <div className='display'>
            <img src={game_image} alt={game_name} />
            <p>{game_name}</p>
        </div>

        <div className='options'>
        <FaWindows  />
        <FaApple />
        <span>&#8377;{game_price}</span>
        </div>
    </div>
  )
}

export default ReviewItems