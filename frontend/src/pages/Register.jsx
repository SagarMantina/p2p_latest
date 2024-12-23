


import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaKey } from 'react-icons/fa';
import styles from "../styles/Register.module.css";
import Header from './Header';
import Footer from './Footer';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirm_pass: '',
    userType: '', 
  });

  const [errorMessage, setErrorMessage] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Email validation function
  const validateEmail = (email) => {
    // Regex pattern to ensure email ends with allowed domains (like gmail.com or other valid domains)
    const pattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|)$/;
    return pattern.test(email);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // Validate email
    if (!validateEmail(formData.email)) {
      setErrorMessage("Email must end with gmail.com, yahoo.com, or hotmail.com.");
      return;
    }

    // Validate if passwords match
    if (formData.password !== formData.confirm_pass) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirm_pass: formData.confirm_pass,
        userrole: formData.userType, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      setErrorMessage(errorData.errorMessage || "An error occurred."); 
    } else {
      window.location.href = "http://localhost:5000/register2"; 
    }
  };

  return (
    <>
    <Header />
    <div className={styles['wrapper-register']}>
      <div className={styles['register-box']}>
        <h2>Register</h2>
        <form className={styles['registrationForm']} onSubmit={handleRegister}>
          {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
          
          <div className={styles['inputBx-register']}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <FaEnvelope color="white" style={{ position: 'absolute', right: '15px', top: '16px' }} />
          </div>
  
          <div className={styles['inputBx-register']}>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
            <FaUser color="white" style={{ position: 'absolute', right: '15px', top: '16px' }} />
          </div>
  
          <div className={styles['inputBx-register']}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <FaKey color="white" style={{ position: 'absolute', right: '15px', top: '16px' }} />
          </div>
  
          <div className={styles['inputBx-register']}>
            <input
              type="password"
              id="confirm_pass"
              name="confirm_pass"
              value={formData.confirm_pass}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirm_pass">Retype password</label>
          </div>
  
          <div className={styles['selectBx-register']}>
            <label htmlFor="userType"></label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your type</option>
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
  
          <div className={styles['new-register']}>
            <button type="submit">
              Next
            </button>
          </div>
  
          <div className={styles['paragraph-register']}>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Register;