import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./BrandPartners.css";

// Correct import path from: src/common/BrandPartners.js
// To: src/Assets/brands/
import brand1 from "../Assets/Brands/brand1.png";
import brand2 from "../Assets/Brands/brand2.png";
import brand3 from "../Assets/Brands/brand3.png";
import brand4 from "../Assets/Brands/brand4.png";
import brand5 from "../Assets/Brands/brand5.png";
import brand6 from "../Assets/Brands/brand6.png";
import brand7 from "../Assets/Brands/brand7.png";

const BrandPartners = () => {
  const brands = [
    { id: 1, logo: brand1, name: "Brand 1" },
    { id: 2, logo: brand2, name: "Brand 2" },
    { id: 3, logo: brand3, name: "Brand 3" },
    { id: 4, logo: brand4, name: "Brand 4" },
    { id: 5, logo: brand5, name: "Brand 5" },
    { id: 6, logo: brand6, name: "Brand 6" },
    { id: 7, logo: brand7, name: "Brand 7" }
  ];

  return (
    <div className="brandPartners">
      <h5>Company Partners</h5>
      <Swiper
        slidesPerView={1}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <div className="brandLogo">
              <img src={brand.logo} alt={brand.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandPartners;