// SpotDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewModal from "../ReviewModal/ReviewModal";
import "./SpotDetails.css";

function SpotDetails() {
  const { spotId } = useParams(); // Get spotId from URL params
  const [spot, setSpot] = useState(null); // Spot state
  const [reviews, setReviews] = useState([]); // Reviews state
  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [currentUser, setCurrentUser] = useState(null); // Current user state
  const [reviewToDelete, setReviewToDelete] = useState(null); // Review to be deleted
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Review delete modal state

  useEffect(() => {
    // Fetch spot details
    fetch(`/api/spots/${spotId}`)
      .then((response) => response.json())
      .then((data) => setSpot(data))
      .catch((error) => console.error("Error fetching spot details:", error));

    // Fetch reviews for the spot
    fetch(`/api/spots/${spotId}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []); // Ensure reviews is an array
      })
      .catch((error) => console.error("Error fetching reviews:", error));

    // Fetch current user info (if necessary)
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => setCurrentUser(data.user))
      .catch((error) => console.error("Error fetching current user:", error));
  }, [spotId]);

  if (!spot) return <p>Loading...</p>; // Loading state

  // Calculate average rating and review count
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.stars, 0) /
          reviews.length
        ).toFixed(1)
      : null;
  const reviewCount = reviews.length;

  // Determine if the current user can post a review
  const hasPostedReview =
    Array.isArray(reviews) &&
    reviews.some((review) => review.userId === currentUser?.id);
  const canPostReview =
    currentUser && !hasPostedReview && spot.ownerId !== currentUser.id;

  const handleReviewPosted = (newReview) => {
    // Update reviews state with the new review
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const openDeleteModal = (reviewId) => {
    setReviewToDelete(reviewId); // Set the review ID to be deleted
    setDeleteModalOpen(true); // Open delete confirmation modal
  };

  const closeDeleteModal = () => {
    setReviewToDelete(null); // Clear the review to be deleted
    setDeleteModalOpen(false); // Close delete confirmation modal
  };

  const handleDeleteReview = () => {
    // Perform the deletion
    fetch(`/api/reviews/${reviewToDelete}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the deleted review from the state
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewToDelete)
        );
        closeDeleteModal(); // Close the modal
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <p>
        {spot.city}, {spot.state}, {spot.country}
      </p>

      <div className="spot-images">
        <img src={spot.previewImage} alt={spot.name} className="large-image" />
        {spot.images &&
          spot.images
            .slice(0, 4)
            .map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Image ${index + 1}`}
                className="small-image"
              />
            ))}
      </div>

      {/* Callout Information Box */}
      <div>{reviews.user}</div>
      <div className="callout-box">
        <p>${spot.price} / night

        <div className="rating-summary">
          <span className="star-icon">★</span>
          {avgRating ? (
            <span>
              {avgRating} · {reviewCount}{" "}
              {reviewCount === 1 ? "Review" : "Reviews"}
            </span>
          ) : (
            <span>New</span>
          )}
        </div>
          </p>
        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
      </div>

      {/* Reviews Section */}
      <h2 className="Review-title">
        Reviews{" "}
        {avgRating &&
          `(${avgRating}) · ${reviewCount} ${
            reviewCount === 1 ? "Review" : "Reviews"
          }`}
      </h2>
      {canPostReview && (
        <button onClick={() => setModalOpen(true)}>Post Your Review</button>
      )}

      {reviewCount > 0 ? (
        <ul className="reviews-list">
          {reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((review) => (
              <li key={review.id}>
                <p>{review.User.firstName}</p>
                <p>
                  {new Date(review.createdAt).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>{review.review}</p>
                {/* Show delete button only for the current user's review */}
                {currentUser?.id === review.userId && (
                  <button onClick={() => openDeleteModal(review.id)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
        </ul>
      ) : (
        <p>
          {spot.ownerId !== currentUser?.id
            ? "Be the first to post a review!"
            : "No reviews yet."}
        </p>
      )}

      {/* Modal for posting a review */}
      {isModalOpen && (
        <ReviewModal
          spotId={spotId}
          onClose={() => setModalOpen(false)}
          onReviewPosted={handleReviewPosted}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className="btn-delete" onClick={handleDeleteReview}>
              Yes (Delete Review)
            </button>
            <button className="btn-cancel" onClick={closeDeleteModal}>
              No (Keep Review)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotDetails;
