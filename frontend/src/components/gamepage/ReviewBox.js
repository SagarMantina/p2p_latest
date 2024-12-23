import ReactStars from "react-rating-stars-component";

const ReviewBox = ({ review }) => {
  return (
    <div className="ReviewBox">
      <div className="review_person_image">
        <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="reviewed person" />
      </div>
      <div className="review">
        <span>{review.name}</span> 
        <span style={{color:"yellow", marginLeft:"10px", fontSize:"15px", fontWeight:"lighter"}}>{review.timestamp}</span>
        <div className="stars-and-review">
          <ReactStars
            size={24}
            count={5}
            value={review.rating}
            activeColor="#D4AF37"  // Gold color for filled stars
            color="#C0C0C0"        // Light gray for empty stars
            edit={false}
          />
          <span className="review-text">{review.review}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
