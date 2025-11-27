import React from 'react';
import './FashionFilter.css';

const FashionFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const brands = ['all', 'Zara', 'H&M', 'Mango', 'Uniqlo', 'ASOS', 'Free People', 'Ann Taylor', 'Aritzia', 'Reformation', 'Levi\'s', 'Self-Portrait', 'Gap'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['all', 'Black', 'White', 'Red', 'Pink', 'Navy Blue', 'Multicolor', 'Cream', 'Emerald Green', 'Blue', 'Ivory', 'Grey'];

  return (
    <div className="fashionFilter">
      <div className="electronicsNavigation">
        <h3>FILTERS</h3>

        {/* Price Range Filter */}
        <div className="filterGroup">
          <h4>PRICE RANGE</h4>
          <div className="filterOptions">
            {[
              { value: 'all', label: 'All Prices' },
              { value: 'under50', label: 'Under $50' },
              { value: '50-100', label: '$50 - $100' },
              { value: '100-150', label: '$100 - $150' },
              { value: 'over150', label: 'Over $150' }
            ].map(option => (
              <label key={option.value} className="filterOption">
                <input
                  type="radio"
                  name="priceRange"
                  value={option.value}
                  checked={filters.priceRange === option.value}
                  onChange={(e) => onFilterChange('priceRange', e.target.value)}
                />
                <span className="checkmark"></span>
                <span className="labelText">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="filterGroup">
          <h4>BRAND</h4>
          <div className="filterOptions">
            {brands.map(brand => (
              <label key={brand} className="filterOption">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => onFilterChange('brand', e.target.value)}
                />
                <span className="checkmark"></span>
                <span className="labelText">{brand === 'all' ? 'All Brands' : brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="filterGroup">
          <h4>CATEGORY</h4>
          <div className="filterOptions">
            {['all', 'Dresses', 'Casual', 'Formal', 'Party', 'Summer', 'Winter'].map(category => (
              <label key={category} className="filterOption">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                />
                <span className="checkmark"></span>
                <span className="labelText">{category === 'all' ? 'All Categories' : category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="filterGroup">
          <h4>SIZE</h4>
          <div className="filterOptions">
            {sizes.map(size => (
              <label key={size} className="filterOption">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={filters.size === size}
                  onChange={(e) => onFilterChange('size', e.target.value)}
                />
                <span className="checkmark"></span>
                <span className="labelText">{size === 'all' ? 'All Sizes' : size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="filterGroup">
          <h4>COLOR</h4>
          <div className="filterOptions">
            {colors.map(color => (
              <label key={color} className="filterOption">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={filters.color === color}
                  onChange={(e) => onFilterChange('color', e.target.value)}
                />
                <span className="checkmark"></span>
                <span className="labelText">{color === 'all' ? 'All Colors' : color}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="applyFilters" onClick={onClearFilters}>
          CLEAR ALL FILTERS
        </button>
      </div>
    </div>
  );
};

export default FashionFilter;