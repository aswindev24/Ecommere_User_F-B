import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import './Contact.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Message sent successfully!');
  };

  return (
    <div className="Contact-page">
      <Header />
      
      <div className="contactSection">
        <h2>Contact Us</h2>
        
        {/* Map Section */}
        <div className="contactMap">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.857315933345!2d77.59461431482105!3d12.97189099088317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1647851234567!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            allowFullScreen="" 
            loading="lazy"
            title="Lestora Location"
          ></iframe>
        </div>

        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>Get In Touch</h3>
              <p>
                We'd love to hear from you. Whether you have questions about our products, 
                need assistance with an order, or want to provide feedback, our team is here to help.
              </p>
              
              <div className="contactDetails">
                <h4>Address</h4>
                <p>123 Business Street<br />Bangalore, Karnataka 560001<br />India</p>
                
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
                
                <h4>Email</h4>
                <p>info@lestora.com</p>
                
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>

            <div className="contactForm">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Subject" 
                  required 
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="6"
                  required
                ></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;