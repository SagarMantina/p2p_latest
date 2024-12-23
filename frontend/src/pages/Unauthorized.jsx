import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Unauthorized.module.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1 className={styles.statusCode}>401 - Unauthorized</h1>
        <p className={styles.text}>You are not authorized to access this page.</p>
        <div className={styles.buttons}>
          <button onClick={handleLoginRedirect} className={styles.loginButton}>
            Try to Login
          </button>
          <button onClick={handleHomeRedirect} className={styles.homeButton}>
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
