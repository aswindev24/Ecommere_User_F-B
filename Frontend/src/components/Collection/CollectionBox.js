import React from "react";
import { Link } from "react-router-dom";
import "./CollectionBox.css";

// Import images
import fashionBg from "../../Assets/CollectionHomepage/fashion-bg.jpg";
import electronicsBg from "../../Assets/CollectionHomepage/electronics-bg.jpg";
import homeBg from "../../Assets/CollectionHomepage/home-bg.jpg";

const CollectionBox = () => {
  return (
    <div className="collectionSection">
      {/* Fashion Collection - Row 1 */}
      <div
        className="collectionRow"
        style={{
          backgroundImage: `url(${fashionBg})`
        }}
      >
        <div className="collectionContent">
          <p className="col-p">New Collection</p>
          <h3 className="col-h3">
            Summer Fashion <span>Collection</span>
          </h3>
          <p className="col-description">
            Discover the latest trends and styles for every occasion
          </p>
          <div className="col-link">
            <Link to="/fashion">
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
      </div>

      {/* Electronics Collection - Row 2 */}
      <div
        className="collectionRow"
        style={{
          backgroundImage: `url(${electronicsBg})`
        }}
      >
        <div className="collectionContent">
          <p className="col-p">Tech Innovation</p>
          <h3 className="col-h3">
            Smart Gadgets <span>Collection</span>
          </h3>
          <p className="col-description">
            Latest technology and electronics at your fingertips
          </p>
          <div className="col-link">
            <Link to="/electronics">
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
      </div>

      {/* Home Appliances Collection - Row 3 */}
      <div
        className="collectionRow"
        style={{
          backgroundImage: `url(${homeBg})`
        }}
      >
        <div className="collectionContent">
          <p className="col-p">Comfort Living</p>
          <h3 className="col-h3">
            Home Essentials <span>Collection</span>
          </h3>
          <p className="col-description">
            Transform your living space with our premium appliances
          </p>
          <div className="col-link">
            <Link to="/homeappliances">
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBox;