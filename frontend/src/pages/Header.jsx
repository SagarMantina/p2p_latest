import React from 'react'
import { Link } from "react-router-dom";
import styles from '../styles/Header.module.css'
import { CgProfile } from "react-icons/cg";

const Header = () => {


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  const currentUser = getCookie("username");

  return (
    <div className={styles['nav-bar']}>
      <img src="/images/design_a_logo_with_word__P2P__p2p_with_high_-removebg-preview-transformed.png" alt="" />
    <nav>
      <li>
        <Link to="/">STORE</Link>
      </li>
      <li>
        <Link to="/chat">CHAT</Link>
      </li>
      <li>
        <Link to="/communities">COMMUNITY</Link>
      </li>
      {currentUser ? (
        <li>
          <Link to="/dashboard"><CgProfile size={60}/></Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/register">REGISTER</Link>
          </li>
        </>
      )}
    </nav>
  </div>
  
  )
}

export default Header