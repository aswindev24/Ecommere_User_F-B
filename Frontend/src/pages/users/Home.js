import React from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import SubHeader from "../../common/SubHeader";
import HeroSection from "../../components/HeroSection/HeroSection";
//import CollectionBox from "../../components/Collection/CollectionBox";
import Service from "../../common/Service";
import BrandPartners from "../../common/BrandPartners";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <SubHeader />
      <Service />
      <BrandPartners />

      <Footer />
    </div>
  );
};

export default Home;
