import React from 'react'
import {Link} from 'react-router'
import './Footer.css'
import Logo from '../logo/logo.jsx'
function Footer() {
  return (
      <section className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-logo">
            <div className="logo-containe">
              <Logo width="7rem" height='5rem'/>
            </div>
            <p className="footer-copyright">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Features</Link></li>
              <li><Link to="/" className="footer-link">Pricing</Link></li>
              <li><Link to="/" className="footer-link">Affiliate Program</Link></li>
              <li><Link to="/" className="footer-link">Press Kit</Link></li>
            </ul>
          </div>
  
          <div className="footer-section">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Account</Link></li>
              <li><Link to="/" className="footer-link">Help</Link></li>
              <li><Link to="/" className="footer-link">Contact Us</Link></li>
              <li><Link to="/" className="footer-link">Customer Support</Link></li>
            </ul>
          </div>
  
          <div className="footer-section">
            <h3 className="footer-heading">Legals</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Terms &amp; Conditions</Link></li>
              <li><Link to="/" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/" className="footer-link">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </section>
  )
}

export default Footer