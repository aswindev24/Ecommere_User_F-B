import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubHeader.css";

// Import icons (you can use react-icons or custom SVG)
const SubHeader = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Product categories with icons
  const categories = [
    { 
      id: "all", 
      name: "All Products", 
      path: "/products",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    { 
      id: "electronics", 
      name: "Electronics", 
      path: "/category/electronics",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <path d="M12 12h.01"></path>
        </svg>
      )
    },
    { 
      id: "home-appliances", 
      name: "Home Appliances", 
      path: "/category/home-appliances",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    { 
      id: "fashion", 
      name: "Fashion", 
      path: "/category/fashion",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
        </svg>
      )
    },
    { 
      id: "beauty", 
      name: "Beauty & Health", 
      path: "/category/beauty",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      )
    },
    { 
      id: "sports", 
      name: "Sports & Fitness", 
      path: "/category/sports",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      )
    },
    { 
      id: "books", 
      name: "Books & Media", 
      path: "/category/books",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    { 
      id: "toys", 
      name: "Toys & Games", 
      path: "/category/toys",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 20v-6m4 6v-6m4 6v-6M3 7l9-4 9 4M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7h18"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="subHeader">
      <div className="subHeaderContainer">
        <div className="categoriesContainer">
          <ul className="categoriesList">
            {categories.map((category) => (
              <li key={category.id} className="categoryItem">
                <Link
                  to={category.path}
                  className={`categoryLink ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="categoryIcon">
                    {category.icon}
                  </div>
                  <span className="categoryName">{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;