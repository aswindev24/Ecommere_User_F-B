import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Company Info Section */}
        <div className="footer_left">
          <div className="footer_logo_container">
            <h2 className="company-name">Lestora</h2>
          </div>
          <p>
            Discover the latest trends in fashion with Lestora. We bring you quality products with exceptional service and fast delivery.
          </p>
          
          <div className="footer_address">
            <strong>Contact Information</strong>
            <span>123 Fashion Street, Style City</span>
            <span>SC 12345, United States</span>
          </div>

          <div className="footer_address">
            <strong>Customer Service</strong>
            <span>+1 (555) 123-4567</span>
            <span>support@lestora.com</span>
          </div>

          <div className="social_links">
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer_content">
          <h5>Shop</h5>
          <div className="links_container">
            <ul>
              <li><a href="/men">Men's Collection</a></li>
              <li><a href="/women">Women's Collection</a></li>
              <li><a href="/kids">Kids' Collection</a></li>
              <li><a href="/accessories">Accessories</a></li>
              <li><a href="/new-arrivals">New Arrivals</a></li>
            </ul>
          </div>
        </div>

        {/* Customer Service */}
        <div className="footer_content">
          <h5>Customer Service</h5>
          <div className="links_container">
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Company */}
        <div className="footer_content">
          <h5>Company</h5>
          <div className="links_container">
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/affiliates">Affiliates</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Payment */}
        <div className="footer_right">
          <h5>Newsletter</h5>
          <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
          
          <form>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>

          <h6>We Accept</h6>
          
<div className="paymentIconContainer">
  <div className="payment-methods">
    <div className="payment-icon visa">
      <svg width="40" height="25" viewBox="0 0 40 25">
        <rect width="40" height="25" fill="#1A1F71" rx="3"/>
        <path d="M16.5 7L14 18H16L18.5 7H16.5ZM22 7L20.5 12.5L19 7H17L19.5 18H21L23.5 7H22ZM26 7L24 18H26L27 13L28.5 18H30L32 7H30L29 11.5L27.5 7H26ZM10 7L8 18H10L11.5 13L13 18H15L13 7H11.5L10 12L8.5 7H10Z" fill="white"/>
        <path d="M34 7L32 18H34L36 7H34Z" fill="#F7B600"/>
      </svg>
    </div>
    <div className="payment-icon mastercard">
      <svg width="40" height="25" viewBox="0 0 40 25">
        <rect width="40" height="25" fill="#EB001B" rx="3"/>
        <circle cx="15" cy="12.5" r="6" fill="#F79E1B"/>
        <circle cx="25" cy="12.5" r="6" fill="#EB001B" fill-opacity="0.8"/>
      </svg>
    </div>
    <div className="payment-icon amex">
      <svg width="40" height="25" viewBox="0 0 40 25">
        <rect width="40" height="25" fill="#2E77BC" rx="3"/>
        <text x="20" y="15" text-anchor="middle" fill="white" font-size="10" font-weight="bold">AMEX</text>
      </svg>
    </div>
    <div className="payment-icon paypal">
      <svg width="40" height="25" viewBox="0 0 40 25">
        <rect width="40" height="25" fill="#003087" rx="3"/>
        <text x="20" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold">PayPal</text>
      </svg>
    </div>
    <div className="payment-icon apple-pay">
      <svg width="40" height="25" viewBox="0 0 40 25">
        <rect width="40" height="25" fill="black" rx="3"/>
        <text x="20" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold"> Pay</text>
      </svg>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer_bottom">
        <div className="footer_copyright">
          <p>&copy; 2024 Lestora. All rights reserved.</p>
        </div>
        
        <div className="footerLangCurrency">
          <div className="footerLang">
            <span>Language:</span>
            <select>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          
          <div className="footerCurrency">
            <span>Currency:</span>
            <select>
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="jpy">JPY (¥)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;