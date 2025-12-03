import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubHeader.css';

const SubHeader = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Trendy styles for every occasion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop',
      overlayClass: 'pink',
      path: '/fashion'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest tech at your fingertips',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
      overlayClass: 'blue',
      path: '/electronics'
    },
    {
      id: 'home-appliances',
      name: 'Home Appliances',
      description: 'Transform your living space',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop',
      overlayClass: 'orange',
      path: '/homeappliances'
    }
  ];

  return (
    <div className="category-section">
      <p>Shop by Category</p>
      <p>
        Explore our curated collections across three premium departments</p>
      <div className="categories-container">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="category-card"
            onClick={() => setActiveCategory(category.id)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <div className={`category-overlay ${category.overlayClass}`}></div>
            <div className="category-content">

              <h3 className="category-title">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <span className="category-link">
                Explore Collection
                <svg
                  className="category-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;