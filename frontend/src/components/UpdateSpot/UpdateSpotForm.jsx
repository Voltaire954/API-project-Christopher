// src/components/UpdateSpotForm/UpdateSpotForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateSpotForm() {
  const { spotId } = useParams(); // Get the spot ID from the URL
  const navigate = useNavigate();
  const [spotData, setSpotData] = useState({
    name: "",
    description: "",
    city: "",
    state: "",
    country: "",
    price: "",
    previewImage: "",
    images: [],
  });

  useEffect(() => {
    // Fetch the existing spot data to populate the form
    fetch(`/api/spots/${spotId}`)
      .then((response) => response.json())
      .then((data) => setSpotData(data))
      .catch((error) => console.error("Error fetching spot details:", error));
  }, [spotId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated spot data to API
    fetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotData),
    })
      .then((response) => response.json())
      .then((updatedSpot) => {
        navigate(`/spots/${updatedSpot.id}`); // Navigate to the updated spot's detail page
      })
      .catch((error) => console.error("Error updating spot:", error));
  };

  return (
    <div className="update-spot-form">
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={spotData.name}
            onChange={(e) => setSpotData({ ...spotData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={spotData.description}
            onChange={(e) => setSpotData({ ...spotData, description: e.target.value })}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={spotData.city}
            onChange={(e) => setSpotData({ ...spotData, city: e.target.value })}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={spotData.state}
            onChange={(e) => setSpotData({ ...spotData, state: e.target.value })}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={spotData.country}
            onChange={(e) => setSpotData({ ...spotData, country: e.target.value })}
            required
          />
        </label>
        <label>
          Price per Night
          <input
            type="number"
            value={spotData.price}
            onChange={(e) => setSpotData({ ...spotData, price: e.target.value })}
            required
          />
        </label>
        <label>
          Preview Image URL (Optional)
          <input
            type="text"
            value={spotData.previewImage}
            onChange={(e) => setSpotData({ ...spotData, previewImage: e.target.value })}
          />
        </label>

        {/* Add additional image inputs if necessary */}
        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
}

export default UpdateSpotForm;
