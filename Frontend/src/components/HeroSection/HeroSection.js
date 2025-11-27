import React, { useState, useEffect } from "react";
import "./HeroSection.css";

// Import images directly
import Offer1 from "../../Assets/TodaysOffer/Offer1.jpg";
import Offer2 from "../../Assets/TodaysOffer/Offer2.jpg";
import Offer3 from "../../Assets/TodaysOffer/Offer3.jpg";

const HeroSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  // Today's offers data with direct image imports only
  const todayOffers = [
    { id: 1, image: Offer1 },
    { id: 2, image: Offer2 },
    { id: 3, image: Offer3 }
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

  return (
    <div className="heroMain">
      {/* Background Carousel */}
      <div className="heroCarousel">
        {todayOffers.map((offer, index) => (
          <div
            key={offer.id}
            className={`heroSlide ${index === currentOffer ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${offer.image})`
            }}
          />
        ))}
      </div>

      {/* Carousel Controls */}
      <button className="carouselBtn carouselPrev" onClick={prevOffer}>
        ‹
      </button>
      <button className="carouselBtn carouselNext" onClick={nextOffer}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="carouselDots">
        {todayOffers.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentOffer ? 'active' : ''}`}
            onClick={() => setCurrentOffer(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;