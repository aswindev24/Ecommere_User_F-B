import React from "react";
import "./Service.css";

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "24/7 Support",
      description: "Round the clock customer support",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="servicesSection">
      <div className="servicesHeader">

        <h2 className="servicesTitle">Why Shop With Us?</h2>
        <p className="servicesDescription">
          Experience excellence in every aspect of your shopping journey
        </p>
      </div>

      <div className="servicesGrid">
        {services.map((service) => (
          <div key={service.id} className="serviceCard">
            <div className={`serviceIconWrapper ${service.gradient}`}>
              <div className="serviceIcon">
                {service.icon}
              </div>
            </div>
            <h3 className="serviceTitle">{service.title}</h3>
            <p className="serviceDescription">{service.description}</p>
            <div className="serviceHoverEffect"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;