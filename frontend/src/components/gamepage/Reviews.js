import ReviewBox from './ReviewBox'
import ReactStars from "react-rating-stars-component";
import { FaPen } from "react-icons/fa6";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";  // Import toast components
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS
import { useParams } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const Reviews = ({ reviews, curr_rating }) => {

    const { gamename } = useParams();
    const handleReview = async () => {
      setShowForm(true);
    
      try {
        const response = await fetch(`${baseUrl}/postreview/${gamename}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviewrating: userReview.rating,
            postreview: userReview.comment,
          }),
          credentials: 'include',
        });
    
        const result = await response.json();
    
        if (response.ok) {
          toast.success("Review posted successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          console.log('Review posted successfully');
          setUserReview({ rating: 0, comment: "" }); // Reset the form
          setShowForm(false); // Hide the form
        } else {
          toast.error(result.message || "Error posting review", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error('Error posting review:', result.message);
        }
      } catch (err) {
        toast.error("An error occurred while posting the review", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error('Fetch error:', err);
      }
    };
    
    
    const [userReview, setUserReview] = useState({
        rating: 0,
        comment: "",
      });
    const [showForm , setShowForm] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();

      // Hide form after submission
      setShowForm(false);

       // Reset form fields
       setUserReview({ rating: 0, comment: "" });

       
    };

    const toggleReviews = () => {
        setShowAllReviews(!showAllReviews);
      };
    
    // Determine the reviews to display (first 3 or all)
    const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 2);


  return (
    <div className="ReviewContainer">
    <h1>
        Ratings & Reviews
    </h1>
    <div className="reviews">
        <div className="overall_rating">
            <span style={{fontSize:'40px', color:'#D4AF37'}}>{curr_rating}</span>
          <ReactStars
            size={24}
            count={5}
            value={curr_rating}
            activeColor="#D4AF37" 
            color="#C0C0C0"    
            edit={false}
          /> <p style={{fontSize:'10px'}}>{`${reviews.length} reviews`}</p> </div>

          {/* Button to toggle form visibility */}
          <button onClick={()=> {
            setShowForm(!showForm)
            setUserReview({ rating: 0, comment: "" });
            }} className="reviewpostButton" >
          {showForm ? "Cancel" : (<><FaPen /> Post Review</>)}
          </button>

        {
            showForm && (
                <form onSubmit={handleSubmit}>
                    <div style={{position:'relative', left:'5%'}}>
                    <ReactStars
                        size={24}
                        count={5}
                        value={userReview.rating}
                        onChange={(newRating) =>
                          setUserReview({ ...userReview, rating: newRating })
                        }
                        activeColor="#D4AF37"
                        color="#C0C0C0"
                    />
                    </div>
                    <textarea
                        value={userReview.comment}
                        onChange={(e) =>
                          setUserReview({ ...userReview, comment: e.target.value })
                        }
                        placeholder="Write your review"
                        rows="4"
                        cols="50"
                        required
                    />
                    <br />
                    <button type="submit" className="submitButton" onClick={handleReview}>Submit Review</button>
                </form>
            )
        }

         {/* Display reviews (limit to 3 or all) */}
        {reviewsToDisplay.length ? (
          reviewsToDisplay.map((review, index) => (
            <ReviewBox key={index} review={review} />
          ))
        ) : (
          <p>No reviews</p>
        )}

         {/* Toggle 'Read More'/'Read Less' button */}
        {reviews.length > 2 && (
          <button onClick={toggleReviews} className="toggleReviewsButton">
            {showAllReviews ? "Read Less" : "Read More"}
          </button>
        )}


      {/* Toast container to show toast notifications */}
      <ToastContainer />
    </div>
    </div>
  );
};

export default Reviews;
