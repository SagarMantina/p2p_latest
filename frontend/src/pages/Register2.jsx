import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register2.css';
import Header from './Header';
import Footer from './Footer';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const Register2 = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    backupKey: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle show/hide password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    const response = await fetch(`${baseUrl}/register2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.log("Error submitting form");
    } else {
      window.location.href = "http://localhost:5000/login";
    }
  };

  return (
  <>
    <Header />
    <div className="register2">
      <div className="total">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className='registerform2'>

          {/* Date of Birth Input */}
          <div className="inputBx">
            <input
              type="date"
              id="date-of-birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <label htmlFor="date-of-birth">Date-of-Birth:</label>
          </div>

          {/* Backup Key Input with Toggle Visibility */}
          <div className="inputBx">
            <input
              type={showPassword ? 'text' : 'password'}
              id="backupKey"
              name="backupKey"
              value={formData.backupKey}
              onChange={handleChange}
              required
            />
            <label htmlFor="backupKey">Backup-Key</label>
            <i onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          {/* Notice Section */}
          <div className="notice">
            <p><strong>Notice:</strong> Please remember your backup key!</p>
            <p>
              Your backup key is essential for securely changing your password in case you forget it or need to reset it. 
              Make sure to store it in a safe place that you can access easily when needed.
            </p>
          </div>

          {/* Submit Button */}
          <div className="register2_button">
            <button type="submit">CONFIRM</button>
          </div>

          {/* Already have an account */}
          <div className="matter">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default Register2;
