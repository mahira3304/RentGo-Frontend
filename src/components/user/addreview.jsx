import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../../css/user/addreview.css";
import { useNavigate } from "react-router";

export default function AddReview () {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate()

  async function postReview(e) {
        
        e.preventDefault();

        const reviewData = {
          rating: rating,
          review: feedback,
        }

        try {
            const res =await fetch("https://rentgo-backend.onrender.com/user/submitreview",{
                method:"POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(reviewData)
            })

            const data =await res.json()
            
            if (data.success) {
                alert(`Rating: ${rating}\nFeedback: ${feedback}`)
                navigate("/user")
            } else {
                console.log("submission failed!!!")
            }
        } catch (error) {
            console.log(error) 
        }
    }

  

  return (
    <form method="POST" onSubmit={postReview}>
    <div className="rating-container">
      <h4 className="title">Rate Your Experience</h4>

      <div className="stars">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
                className="hidden-input"
              />
              <FaStar
                size={30}
                className="star"
                color={ currentRating <= (hover || rating)? "#d4a017": "#ccc"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <textarea className="feedback-box" name="review" placeholder="Type here..." value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
      <button className="submit-btn">Submit</button>
    </div>
    </form>
  );
};

