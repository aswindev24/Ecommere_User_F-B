import React, { useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import "./Affiliate.css";

import { Link } from "react-router-dom";
import { FaStar, FaCheckCircle, FaUsers, FaChartLine, FaMoneyBillWave, FaHandshake, FaCreditCard, FaHeadset } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";

const Affiliate = () => {
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    socialMedia: "",
    promotionMethods: "",
    audienceSize: "",
    referralCode: "",
    agreeToTerms: false
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would submit this data to your backend
    toast.success("Application submitted successfully!", {
      duration: 3000,
      style: {
        backgroundColor: "#07bc0c",
        color: "white",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#07bc0c",
      },
    });
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      website: "",
      socialMedia: "",
      promotionMethods: "",
      audienceSize: "",
      referralCode: "",
      agreeToTerms: false
    });
  };

  return (
    <>
    <Header/>
      <div className="affiliateProgram">
        
        <div className="affiliateMain">
          <div className="affiliate__left">
            <div className="affiliateNavigation">
              <h3>Affiliate Program</h3>
              <ul>
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#commission">Commission Structure</a></li>
                <li><a href="#requirements">Requirements</a></li>
                <li><a href="#register">Register Now</a></li>
              </ul>
            </div>
          </div>
          <div className="affiliate__right">
            <div className="affiliateHeader">
              <div className="affiliateBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/affiliate">Affiliate Program</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <p>Navigation</p>
              </div>
            </div>
            
            <div className="affiliateHero">
              <h1>Join Our Affiliate Program</h1>
              <p>Earn commissions by promoting our products to your audience. Join thousands of successful affiliates today!</p>
              <div className="affiliateStats">
                <div className="stat">
                  <h3>15%</h3>
                  <p>Commission Rate</p>
                </div>
                <div className="stat">
                  <h3>30 Day</h3>
                  <p>Cookie Duration</p>
                </div>
                <div className="stat">
                  <h3>1000+</h3>
                  <p>Active Affiliates</p>
                </div>
              </div>
            </div>

            <div className="affiliateSection" id="benefits">
              <h2>Why Join Our Affiliate Program?</h2>
              <div className="benefitsGrid">
                <div className="benefitCard">
                  <FaMoneyBillWave className="benefitIcon" />
                  <h3>Generous Commissions</h3>
                  <p>Earn up to 15% commission on every sale you refer. The more you promote, the more you earn.</p>
                </div>
                <div className="benefitCard">
                  <FaUsers className="benefitIcon" />
                  <h3>Large Product Range</h3>
                  <p>Promote from our extensive catalog of high-quality products that appeal to diverse audiences.</p>
                </div>
                <div className="benefitCard">
                  <FaChartLine className="benefitIcon" />
                  <h3>Real-time Tracking</h3>
                  <p>Monitor your performance with our advanced dashboard and real-time analytics.</p>
                </div>
                <div className="benefitCard">
                  <FaHandshake className="benefitIcon" />
                  <h3>Dedicated Support</h3>
                  <p>Get personalized support from our affiliate team to help maximize your earnings.</p>
                </div>
              </div>
            </div>

            <div className="affiliateSection" id="how-it-works">
              <h2>How It Works</h2>
              <div className="stepsContainer">
                <div className="step">
                  <div className="stepNumber">1</div>
                  <h3>Sign Up</h3>
                  <p>Complete our simple application form and get approved within 48 hours.</p>
                </div>
                <div className="step">
                  <div className="stepNumber">2</div>
                  <h3>Promote</h3>
                  <p>Use your unique affiliate links to promote our products on your platform.</p>
                </div>
                <div className="step">
                  <div className="stepNumber">3</div>
                  <h3>Earn</h3>
                  <p>Get paid for every sale made through your referral links.</p>
                </div>
              </div>
            </div>

            <div className="affiliateSection" id="commission">
              <h2>Commission Structure</h2>
              <div className="commissionTable">
                <div className="tableHeader">
                  <div className="headerCell">Sales Tier</div>
                  <div className="headerCell">Commission Rate</div>
                  <div className="headerCell">Bonus</div>
                </div>
                <div className="tableRow">
                  <div className="tableCell">0 - 10 sales/month</div>
                  <div className="tableCell">10%</div>
                  <div className="tableCell">-</div>
                </div>
                <div className="tableRow">
                  <div className="tableCell">11 - 50 sales/month</div>
                  <div className="tableCell">12%</div>
                  <div className="tableCell">-</div>
                </div>
                <div className="tableRow highlight">
                  <div className="tableCell">51+ sales/month</div>
                  <div className="tableCell">15%</div>
                  <div className="tableCell">$100 bonus</div>
                </div>
              </div>
              <p className="commissionNote">* Commissions are paid monthly via PayPal or bank transfer.</p>
            </div>

            <div className="affiliateSection" id="requirements">
              <h2>Program Requirements</h2>
              <div className="requirementsList">
                <div className="requirementItem">
                  <FaCheckCircle className="checkIcon" />
                  <p>Active website, blog, or social media presence</p>
                </div>
                <div className="requirementItem">
                  <FaCheckCircle className="checkIcon" />
                  <p>Quality content relevant to our products</p>
                </div>
                <div className="requirementItem">
                  <FaCheckCircle className="checkIcon" />
                  <p>Compliance with our affiliate terms and conditions</p>
                </div>
                <div className="requirementItem">
                  <FaCheckCircle className="checkIcon" />
                  <p>No spam or deceptive marketing practices</p>
                </div>
              </div>
            </div>

            <div className="affiliateSection" id="register">
              <h2>Become an Affiliate Today</h2>
              <p className="sectionSubtitle">Fill out the form below to start your application.</p>
              
              <form className="affiliateForm" onSubmit={handleSubmit}>
                <div className="formRow">
                  <div className="formGroup">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="formGroup">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="formGroup">
                  <label htmlFor="website">Website or Blog URL</label>
                  <input 
                    type="url" 
                    id="website" 
                    name="website" 
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://"
                  />
                </div>
                
                <div className="formGroup">
                  <label htmlFor="socialMedia">Social Media Profiles</label>
                  <textarea 
                    id="socialMedia" 
                    name="socialMedia" 
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="Please list your social media handles and follower counts"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="formGroup">
                  <label htmlFor="promotionMethods">How do you plan to promote our products?</label>
                  <textarea 
                    id="promotionMethods" 
                    name="promotionMethods" 
                    value={formData.promotionMethods}
                    onChange={handleInputChange}
                    placeholder="Describe your promotion methods (blog posts, social media, email marketing, etc.)"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="formGroup">
                  <label htmlFor="audienceSize">Estimated Monthly Audience Size</label>
                  <select 
                    id="audienceSize" 
                    name="audienceSize" 
                    value={formData.audienceSize}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="0-1k">0 - 1,000</option>
                    <option value="1k-10k">1,001 - 10,000</option>
                    <option value="10k-50k">10,001 - 50,000</option>
                    <option value="50k-100k">50,001 - 100,000</option>
                    <option value="100k+">100,000+</option>
                  </select>
                </div>
                
                <div className="formGroup">
                  <label htmlFor="referralCode">Referral Code (if applicable)</label>
                  <input 
                    type="text" 
                    id="referralCode" 
                    name="referralCode" 
                    value={formData.referralCode}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="formCheckbox">
                  <input 
                    type="checkbox" 
                    id="agreeToTerms" 
                    name="agreeToTerms" 
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="agreeToTerms">
                    I agree to the <a href="/terms">Affiliate Program Terms and Conditions</a>
                  </label>
                </div>
                
                <button type="submit" className="submitButton">Apply Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Navigation</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <div className="affiliateNavigation mobile">
            <h3>Affiliate Program</h3>
            <ul>
              <li><a href="#benefits" onClick={closeDrawer}>Benefits</a></li>
              <li><a href="#how-it-works" onClick={closeDrawer}>How It Works</a></li>
              <li><a href="#commission" onClick={closeDrawer}>Commission Structure</a></li>
              <li><a href="#requirements" onClick={closeDrawer}>Requirements</a></li>
              <li><a href="#register" onClick={closeDrawer}>Register Now</a></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Affiliate;