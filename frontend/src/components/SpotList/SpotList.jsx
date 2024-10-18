// SpotList.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import { fetchSpots } from "/home/christopher/API-project-Christopher/frontend/src/store/spots.js";
import "./SpotList";
function SpotList() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.list);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSpots())
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Error fetching spots:", err);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="spot-list">
      {spots.length > 0 ? (
        spots.map((spot) => {
          const {
            id,
            previewImage,
            city,
            state,
            name,
            avgRating,
            price,
            numReviews = 0, // Default value for numReviews
          } = spot;

          // Fallback for preview image
          const imageSrc = previewImage || "https://via.placeholder.com/300";

          // Display "New" if there are no reviews, otherwise display average rating
          const ratingDisplay = avgRating ? `${avgRating.toFixed(1)} ★` : "New";

          // Show rating followed by review count, e.g., "4.5 ★ · 3 Reviews"
          const reviewsInfo = avgRating
            ? `${ratingDisplay} · ${numReviews} ${
                numReviews === 1 ? "Review" : "Reviews"
              }`
            : ratingDisplay;

          return (
            <NavLink
              to={`/spots/${id}`}
              key={id}
              className="spot-card"
              title={name}
            >
              <img src={imageSrc} alt={name} className="thumbnail" />
              <h3>{name}</h3>

                <p>{reviewsInfo}</p> {/* Display rating and review count */}

              <p>
                {city}, {state}
              </p>
              <div className="price">

              <p>${price.toFixed(2)} / night</p>
              </div>
            </NavLink>
          );
        })
      ) : (
        <p>No spots available.</p>
      )}
    </div>
  );
}

export default SpotList;
