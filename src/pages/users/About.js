import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import BrandPartners from '../../common/BrandPartners';
import Service from '../../common/Service';
import './About.css';

import about1 from "../../Assets/About/about1.jpg"
import about2 from "../../Assets/About/about2.jpg";

const About = () => {
  return (
    <div className="About-page">
      <Header />
      
      <div className="aboutSection">
      <h2>Our Story</h2>
      
      {/* First image */}
      <img src={about1} alt="Lestora Story" />
      
      <div className="aboutContent">
        <p>
          Lestora has grown from its roots in IT Infrastructure Services & Solutions to becoming a dynamic player in the e-commerce space. Today, we bring the same creativity, technical expertise, and commitment to excellence to our online platform, offering a curated range of electronics, sofas, and lifestyle products. Our mission is to provide a seamless shopping experience with quality products, competitive pricing, and reliable service.
        </p>

        <div className="content1">
          <div className="contentBox">
            <h5>Our Mission</h5>
            <p>
              To deliver exceptional e-commerce experiences by combining innovative technology, user-friendly design, and customer-focused service. We aim to make online shopping simple, enjoyable, and trustworthy for every customer.
            </p>
          </div>
          
          <div className="contentBox">
            <h5>Our Vision</h5>
            <p>
              To become a leading e-commerce destination for electronics, home furnishings, and lifestyle products, recognized for quality, convenience, and customer satisfaction.
            </p>
          </div>
        </div>

        <div className="content2">
          <div className="imgContent">
            <img src={about2} alt="Lestora Company" />
          </div>
          
          <div className="textContent">
            <h5>The Company</h5>
            <p>
              At Lestora, we leverage our expertise in technology and digital solutions to enhance every aspect of online shopping. From product discovery to secure checkout and timely delivery, we focus on creating a seamless journey for our customers. Our team continuously explores new trends, marketing strategies, and technologies to ensure our customers always have access to the best products and services.
            </p>
          </div>
        </div>
      </div>
    </div>

      <Service />
      <BrandPartners />
      <Footer />
    </div>
  );
};

export default About;