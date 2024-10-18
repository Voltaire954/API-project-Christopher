import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function ManageSpots() {
  const [spots, setSpots] = useState([]);
  const [spotToDelete, setSpotToDelete] = useState(null); // State for the spot to delete
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch spots created by the current user
    fetch("/api/spots/current") // Adjust this endpoint as per your API
      .then((response) => response.json())
      .then((data) => setSpots(data)) // Assume `data` is an array of user's spots
      .catch((error) => console.error("Error fetching user's spots:", error));
  }, []);

  const openDeleteModal = (spotId) => {
    setSpotToDelete(spotId); // Set the selected spot for deletion
    setDeleteModalOpen(true); // Open the modal
  };

  const closeDeleteModal = () => {
    setSpotToDelete(null); // Clear the selected spot
    setDeleteModalOpen(false); // Close the modal
  };

  const handleDeleteSpot = () => {
    // Implement delete functionality
    fetch(`/api/spots/${spotToDelete}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the deleted spot from the state
        setSpots((prevSpots) =>
          prevSpots.filter((spot) => spot.id !== spotToDelete)
        );
        closeDeleteModal(); // Close the modal after deletion
      })
      .catch((error) => console.error("Error deleting spot:", error));
  };

  return (
    <div className="manage-spots">
      <h1>Manage Spots</h1>
      {spots.length === 0 ? (
        <p>
          No spots have been posted yet.{" "}
          <NavLink to="/spots/new">Create a New Spot</NavLink>
        </p>
      ) : (
        <ul className="spot-tile-list">
          {spots.map((spot) => (
            <li key={spot.id} className="spot-tile">
              <NavLink to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} />
                <div>
                  <h2>{spot.name}</h2>
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <p>${spot.price} / night</p>
                  <div className="rating-summary">
                    <span className="star-icon">★</span>
                    <span>{spot.avgRating || "New"}</span>
                  </div>
                </div>
              </NavLink>
              <div className="spot-actions">
                <button onClick={() => navigate(`/spots/edit/${spot.id}`)}>
                  Update
                </button>
                <button onClick={() => openDeleteModal(spot.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <button className="btn-delete" onClick={handleDeleteSpot}>
              Yes (Delete Spot)
            </button>
            <button className="btn-cancel" onClick={closeDeleteModal}>
              No (Keep Spot)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
