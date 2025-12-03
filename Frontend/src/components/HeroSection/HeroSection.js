// Frontend/src/components/HeroSection/HeroSection.js
import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import axios from 'axios';

const HeroSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/offer-images/fetch-adminOfferImages");

        if (response.data.success) {
          // Replace all URLs with correct port
          const correctedOffers = response.data.offers.map(o => ({
            ...o,
            image: o.image
          }));
          setOffers(correctedOffers);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Auto-rotate offers if we have more than 1
  useEffect(() => {
    if (offers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const nextOffer = () => {
    if (offers.length <= 1) return;
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    if (offers.length <= 1) return;
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
  };

  if (loading) {
    return (
      <div className="heroMain">
        <div className="loadingHero">
          <div className="loadingSpinner"></div>
          <p>Loading offers...</p>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="heroMain">
        <div className="noOffers">
          <p>No offers available at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="heroMain">
      <div className="heroCarousel">
        {offers.map((offer, index) => (
          <div
            key={offer._id}
            className={`heroSlide ${index === currentOffer ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${offer.image})`
            }}
            alt={offer.description || "Offer image"}
          />
        ))}
      </div>

      {offers.length > 1 && (
        <>
          <button className="carouselBtn carouselPrev" onClick={prevOffer}>‹</button>
          <button className="carouselBtn carouselNext" onClick={nextOffer}>›</button>
          <div className="carouselDots">
            {offers.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentOffer ? 'active' : ''}`}
                onClick={() => setCurrentOffer(index)}
              />
            ))}
          </div>
        </>
      )}

      {offers[currentOffer]?.description && (
        <div className="offerDescription">
          <p>{offers[currentOffer].description}</p>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
