import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

// Import images directly
import Offer1 from "../../Assets/TodaysOffer/Offer1.jpg";
import Offer2 from "../../Assets/TodaysOffer/Offer2.jpg";
import Offer3 from "../../Assets/TodaysOffer/Offer3.jpg";

const HeroSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  // Today's offers data with direct image imports
  const todayOffers = [
    {
      id: 1,
      image: Offer1,
      title: "Summer Collection",
      subtitle: "Up to 60% OFF",
      description: "Limited Time Offer - Special Discounts"
    },
    {
      id: 2,
      image: Offer2,
      title: "Free Shipping",
      subtitle: "On All Orders",
      description: "No minimum purchase required",
    },
    {
      id: 3,
      image: Offer3,
      title: "New Arrivals",
      subtitle: "Just Launched",
      description: "Fresh styles for the season"
    }
  ];

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % todayOffers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % todayOffers.length);
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + todayOffers.length) % todayOffers.length);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Check if current offer is ID 2
  const isOffer2 = todayOffers[currentOffer].id === 2;

  return (
    <div className="heroMain">
      {/* Background Carousel */}
      <div className="heroCarousel">
        {todayOffers.map((offer, index) => (
          <div
            key={offer.id}
            className={`heroSlide ${index === currentOffer ? 'active' : ''} ${
              index === (currentOffer - 1 + todayOffers.length) % todayOffers.length ? 'prev' : ''
            }`}
            style={{
              backgroundImage: `url(${offer.image})`
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="heroContent">
        <div className={`sectionleft ${isOffer2 ? 'white-text' : ''}`}>
          <p>New Collection</p>
          <h1>{todayOffers[currentOffer].title}</h1>
          <span>{todayOffers[currentOffer].description}</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Discover How!</h5>
            </Link>
          </div>
        </div>
        
        <div className={`sectionright ${isOffer2 ? 'white-text' : ''}`}>
          <div className="offerHighlight">
            <h2>{todayOffers[currentOffer].subtitle}</h2>
            <p>Special offer ends soon!</p>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button className={`carouselBtn carouselPrev ${isOffer2 ? 'white-controls' : ''}`} onClick={prevOffer}>
        ‹
      </button>
      <button className={`carouselBtn carouselNext ${isOffer2 ? 'white-controls' : ''}`} onClick={nextOffer}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="carouselDots">
        {todayOffers.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentOffer ? 'active' : ''} ${isOffer2 ? 'white-dots' : ''}`}
            onClick={() => setCurrentOffer(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;