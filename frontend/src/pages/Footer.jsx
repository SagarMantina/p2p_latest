import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer
      className="footer"
      role="contentinfo"
      itemScope
      itemType="http://schema.org/WPFooter"
    >
      <div className="social" role="navigation" aria-labelledby="social-heading">
        <h3 id="social-heading" className="sr-only">
          Follow us on social media
        </h3>
        <a href="#" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" aria-label="Twitter">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a href="#" aria-label="Mastodon">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="#" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      
      <ul
        className="footer-links"
        role="navigation"
        aria-labelledby="footer-links-heading"
      >
        <h3 id="footer-links-heading" className="sr-only">
          Footer Links
        </h3>
        <li>
          <a href="/"> Home</a>
        </li>
        <li>
          <a href="/communities">Community</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/chat">Chat</a>
        </li>
        <li>
          <a href="#">Contents</a>
        </li>
      </ul>
      <p className="copyright">
        © 2024   P2P.Some Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;