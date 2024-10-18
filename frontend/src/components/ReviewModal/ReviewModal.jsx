import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/spots"; // Action to post the review

const ReviewModal = ({ spotId, onClose, onReviewPosted }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [serverError, setServerError] = useState(null);

  const isSubmitDisabled = comment.length < 10 || rating === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    try {
      const newReview = await dispatch(
        postReview({ spotId, review: { comment, stars: rating } })
      );
      onReviewPosted(newReview); // Call the function to update reviews in parent component
      onClose(); // Close the modal after posting
    } catch (err) {
      setServerError("An error occurred while posting your review.");
    }
  };

  return (
    <div className="modal">
      <h2>How was your stay?</h2>
      {serverError && <div className="error">{serverError}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your review here..."
        />
        <div>
          <label>Stars</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isSubmitDisabled}>
          Submit Your Review
        </button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ReviewModal;
