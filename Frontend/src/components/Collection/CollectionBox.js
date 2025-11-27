import React from "react";
import { Link } from "react-router-dom";
import "./CollectionBox.css";

// Import images
import fashionBg from "../../Assets/CollectionHomepage/fashion-bg.jpg";
import electronicsBg from "../../Assets/CollectionHomepage/electronics-bg.jpg";
import homeBg from "../../Assets/CollectionHomepage/home-bg.jpg";
import beautyBg from "../../Assets/CollectionHomepage/beauty-bg.jpg";

const CollectionBox = () => {
  return (
    <div className="collectionSection">
      {/* Left - Main large box */}
      <div
        className="collectionLeft"
        style={{
          backgroundImage: `url(${beautyBg})`
        }}
      >
        <div className="collectionContent">
          <p className="col-p">New Collection</p>
          <h3 className="col-h3">
            Summer Fashion <span>Collection</span>
          </h3>
          <div className="col-link">
            <Link to="/category/fashion">
              <h5 style={{ color: "white" }}>Shop Now</h5>
            </Link>
          </div>
        </div>
      </div>

      {/* Right - Split into top and bottom sections */}
      <div className="collectionRight">
        {/* Top right box */}
        <div
          className="collectionTop"
          style={{
            backgroundImage: `url(${electronicsBg})`
          }}
        >
          <div className="collectionContent">
            <p className="col-p" style={{ color: "#e9e9e1ff" }}>Tech Innovation</p>
            <h3 className="col-h3" style={{ color: "#c4c4bfff" }}>
              Smart Gadgets <span >Collection</span>
            </h3>
            <div className="col-link">
              <Link to="/category/electronics">
                <h5 style={{ color: "gray" }}>Shop Now</h5>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom right - split into 2 boxes */}
        <div className="collectionBottom">
          {/* Bottom left box */}
          <div
            className="box1"
            style={{
              backgroundImage: `url(${homeBg})`
            }}
          >
            <div className="collectionContent">
              <p className="col-p" style={{ color: 'white' }}>Comfort Living</p>
              <h3 className="col-h3" style={{ color: "whitesmoke" }}>
                Home Essentials <span>Collection</span>
              </h3>
              <div className="col-link">
                <Link to="/category/home-appliances">
                  <h5 style={{ color: "whitesmoke" }}>Shop Now</h5>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom right box */}
          <div
            className="box2"
            style={{
              backgroundImage: `url(${fashionBg})`
            }}
          >
            <div className="collectionContent">
              <p className="col-p" style={{ color: 'white' }} >Self Care</p>
              <h3 className="col-h3" style={{ color: "gray" }}>
                Beauty Care <span>Collection</span>
              </h3>
              <div className="col-link">
                <Link to="/category/beauty">
                  <h5 style={{ color: 'white' }}>Shop Now</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBox;