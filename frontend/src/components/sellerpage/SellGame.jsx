// src/pages/Sell.js
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/sellerstyles/SellGame.css";

const Sell = () => {
  const [formData, setFormData] = useState({
    gameName: "",
    description: "",
    poster: "",
    mainImage: "",
    subImages: ["", "", "", ""],
    gifs: ["", "", ""],
    category: "",
    releaseDate: "",
    gamePrice: "",
    about: ["", "", ""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("subImage")) {
      const index = parseInt(name.split("-")[1]);
      const updatedSubImages = [...formData.subImages];
      updatedSubImages[index] = value;
      setFormData({ ...formData, subImages: updatedSubImages });
    } else if (name.startsWith("gif")) {
      const index = parseInt(name.split("-")[1]);
      const updatedGifs = [...formData.gifs];
      updatedGifs[index] = value;
      setFormData({ ...formData, gifs: updatedGifs });
    } else if (name.startsWith("about")) {
      const index = parseInt(name.split("-")[1]);
      const updatedAbout = [...formData.about];
      updatedAbout[index] = value;
      setFormData({ ...formData, about: updatedAbout });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Uploaded Successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({
      gameName: "",
      description: "",
      poster: "",
      mainImage: "",
      subImages: ["", "", "", ""],
      gifs: ["", "", ""],
      category: "",
      releaseDate: "",
      gamePrice: "",
      about: ["", "", ""],
    });
  };

  return (
    <div className="seller-form-container">
      <h4>Sell Your Game</h4>
      <form onSubmit={handleSubmit} className="seller-form">
        <div className="sellgamediv">
          <h2>Game Description</h2>
          <div className="seller-input-group">
            <label>Game Name:</label>
            <input
              type="text"
              name="gameName"
              value={formData.gameName}
              onChange={handleChange}
              required
              placeholder="Enter game name"
            />
          </div>

          <div className="seller-input-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Enter game description"
            />
          </div>
        </div>

        <div className="sellgamediv">
          <h2>Game Image Links:</h2>

          <div className="seller-input-group">
            <label>Poster (Image Link):</label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              required
              placeholder="Enter poster image link"
            />
          </div>

          <div className="seller-input-group">
            <label>Main Image (Image Link):</label>
            <input
              type="text"
              name="mainImage"
              value={formData.mainImage}
              onChange={handleChange}
              required
              placeholder="Enter main image link"
            />
          </div>

          <div className="seller-input-group">
            <label>Sub Images (Image Links):</label>
            {formData.subImages.map((subImage, index) => (
              <input
                key={index}
                type="text"
                name={`subImage-${index}`}
                value={subImage}
                onChange={handleChange}
                required
                placeholder={`Enter sub image link ${index + 1}`}
              />
            ))}
          </div>

          <div className="seller-input-group">
            <label>GIFs (GIF Links):</label>
            {formData.gifs.map((gif, index) => (
              <input
                key={index}
                type="text"
                name={`gif-${index}`}
                value={gif}
                onChange={handleChange}
                required
                placeholder={`Enter GIF link ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="sellgamediv">
          <h2>Other Info</h2>

          <div className="seller-input-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
              <option value="Sports">Sports</option>
              <option value="Racing">Racing</option>
              <option value="Horror">Horror</option>
              <option value="Platformer">Platformer</option>
              <option value="MMO">MMO</option>
              <option value="Indie">Indie</option>
              <option value="Casual">Casual</option>
              <option value="Card">Card</option>
              <option value="Educational">Educational</option>
            </select>
          </div>

          <div className="seller-input-group">
            <label>Release Date:</label>
            <input
              type="text"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              placeholder="Enter release date (YYYY-MM-DD)"
            />
          </div>

          <div className="seller-input-group">
            <label>Price ($):</label>
            <input
              type="number"
              name="gamePrice"
              value={formData.gamePrice}
              onChange={handleChange}
              required
              placeholder="Enter game price"
            />
          </div>

          <div className="seller-input-group">
            <label>About:</label>
            {formData.about.map((aboutItem, index) => (
              <input
                key={index}
                type="text"
                name={`about-${index}`}
                value={aboutItem}
                onChange={handleChange}
                required
                placeholder={`Enter about detail ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <button type="submit">Upload</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Sell;
