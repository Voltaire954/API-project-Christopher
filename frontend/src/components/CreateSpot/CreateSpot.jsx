import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateSpotForm() {
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    name: "",
    description: "",
    price: "",
    previewImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/spots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newSpot = await res.json();
      navigate(`/spots/${newSpot.id}`); // Redirect to the new spot's details page
    } else {
      const data = await res.json();
      setErrors(data.errors || {});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-spot-form">
      <h1>Create a New Spot</h1>

      {/* Location Section */}
      <div>
        <h2>Where's your place located?</h2>
        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
        {errors.country && <p>{errors.country}</p>}
        {/* Other location fields */}
      </div>

      {/* Description Section */}
      <div>
        <h2>Describe your place to guests</h2>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <p>{errors.description}</p>}
      </div>

      {/* Title Section */}
      <div>
        <h2>Create a title for your spot</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </div>

      {/* Price Section */}
      <div>
        <h2>Set a base price for your spot</h2>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        {errors.price && <p>{errors.price}</p>}
      </div>

      {/* Photos Section */}
      <div>
        <h2>Liven up your spot with photos</h2>
        <input type="text" name="previewImage" placeholder="Preview Image URL" value={formData.previewImage} onChange={handleChange} />
        {errors.previewImage && <p>{errors.previewImage}</p>}
        {/* Other image inputs */}
      </div>

      {/* Submit Button */}
      <button type="submit">Create Spot</button>
    </form>
  );
}

export default CreateSpotForm;
