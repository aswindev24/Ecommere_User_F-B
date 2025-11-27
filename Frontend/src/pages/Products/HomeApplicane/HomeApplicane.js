import React, { useState } from 'react';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import './HomeAppliances.css';
import { useNavigate } from 'react-router-dom';

const HomeAppliances = () => {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    category: 'all',
    sortBy: 'featured'
  });

  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Smart Refrigerator',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1591798454113-023d7379221f?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Samsung',
      rating: 4.6,
      features: ['Smart Cooling', 'Energy Efficient', 'Touch Screen'],
      description: 'Advanced smart refrigerator with touch screen and energy-efficient cooling technology.',
      specifications: {
        'Capacity': '550L',
        'Type': 'French Door',
        'Energy Rating': 'A++',
        'Smart Features': 'WiFi, Voice Control',
        'Color': 'Stainless Steel'
      },
      images: [
        'https://images.unsplash.com/photo-1591798454113-023d7379221f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'Front Load Washing Machine',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
      category: 'Laundry',
      brand: 'LG',
      rating: 4.5,
      features: ['Front Load', '8kg Capacity', 'Steam Wash'],
      description: 'Efficient front load washing machine with steam technology for better cleaning.',
      specifications: {
        'Capacity': '8kg',
        'Type': 'Front Load',
        'Energy Rating': 'A+++',
        'Spin Speed': '1400 RPM',
        'Features': 'Steam Wash, Quick Wash'
      },
      images: [
        'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1604514813565-83c48a6d5e03?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Inverter Air Conditioner',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=400&h=400&fit=crop',
      category: 'Cooling',
      brand: 'Daikin',
      rating: 4.7,
      features: ['Inverter Technology', 'WiFi Enabled', 'Energy Star'],
      description: 'Powerful inverter AC with smart features and energy-efficient operation.',
      specifications: {
        'Capacity': '1.5 Ton',
        'Type': 'Split AC',
        'Energy Rating': '5 Star',
        'Cooling': 'Rapid Cooling',
        'Smart Features': 'WiFi, App Control'
      },
      images: [
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560672658-5eec54b72d8c?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 4,
      name: 'Convection Microwave Oven',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1616128417747-49d48be9db8a?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Panasonic',
      rating: 4.4,
      features: ['Convection', 'Sensor Cooking', '1000W'],
      description: 'Versatile microwave oven with convection cooking and smart sensor technology.',
      specifications: {
        'Capacity': '32L',
        'Power': '1000W',
        'Type': 'Convection',
        'Features': 'Grill, Auto Cook',
        'Control': 'Digital Touch'
      },
      images: [
        'https://images.unsplash.com/photo-1616128417747-49d48be9db8a?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 5,
      name: 'Robot Vacuum Cleaner',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
      category: 'Cleaning',
      brand: 'iRobot',
      rating: 4.3,
      features: ['Smart Mapping', 'Self-Charging', 'App Control'],
      description: 'Intelligent robot vacuum with smart mapping and automatic charging.',
      specifications: {
        'Type': 'Robot Vacuum',
        'Battery': '90 minutes',
        'Navigation': 'LIDAR Mapping',
        'Features': 'Auto Empty, App Control',
        'Suction': '2000Pa'
      },
      images: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 6,
      name: 'Dishwasher',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Bosch',
      rating: 4.6,
      features: ['Quiet Operation', 'Energy Efficient', 'Multiple Cycles'],
      description: 'Quiet and efficient dishwasher with multiple cleaning cycles.',
      specifications: {
        'Capacity': '12 Place Settings',
        'Noise Level': '44 dB',
        'Energy Rating': 'A+++',
        'Cycles': '6 Programs',
        'Features': 'Half Load, Quick Wash'
      },
      images: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 7,
      name: 'RO Water Purifier',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1595436006173-1cf406f469db?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Kent',
      rating: 4.5,
      features: ['RO+UV', '7 Stage Purification', 'Smart Display'],
      description: 'Advanced water purifier with 7-stage purification and smart monitoring.',
      specifications: {
        'Technology': 'RO + UV + UF',
        'Storage': '8L Tank',
        'Purification': '7 Stages',
        'Features': 'TDS Controller',
        'Display': 'Smart LED'
      },
      images: [
        'https://images.unsplash.com/photo-1595436006173-1cf406f469db?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 8,
      name: 'Air Purifier',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=400&h=400&fit=crop',
      category: 'Air Quality',
      brand: 'Dyson',
      rating: 4.8,
      features: ['HEPA Filter', 'Auto Mode', 'Air Quality Sensor'],
      description: 'Advanced air purifier with HEPA filtration and real-time air quality monitoring.',
      specifications: {
        'Coverage': '800 sq ft',
        'Filtration': 'HEPA + Carbon',
        'Sensors': 'Air Quality, PM2.5',
        'Features': 'Auto Mode, Night Mode',
        'Noise Level': '28 dB'
      },
      images: [
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560672658-5eec54b72d8c?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 9,
      name: 'Food Processor',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1556909114-4d0d853e5e25?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Philips',
      rating: 4.4,
      features: ['1000W Motor', 'Multiple Attachments', 'Safety Lock'],
      description: 'Powerful food processor with multiple attachments for various cooking tasks.',
      specifications: {
        'Power': '1000W',
        'Capacity': '2L Bowl',
        'Attachments': '8 Pieces',
        'Speed Settings': '3 + Pulse',
        'Features': 'Safety Lock'
      },
      images: [
        'https://images.unsplash.com/photo-1556909114-4d0d853e5e25?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 10,
      name: 'Smart TV 55"',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
      category: 'Entertainment',
      brand: 'Sony',
      rating: 4.7,
      features: ['4K Ultra HD', 'Smart TV', 'HDR'],
      description: 'Premium 4K smart TV with stunning picture quality and smart features.',
      specifications: {
        'Screen Size': '55 inch',
        'Resolution': '4K Ultra HD',
        'Smart Platform': 'Android TV',
        'HDR': 'Dolby Vision',
        'Audio': 'Dolby Atmos'
      },
      images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 11,
      name: 'Electric Kettle',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1598970605070-1d4e1e1b5a5a?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Morphy Richards',
      rating: 4.3,
      features: ['1.5L Capacity', 'Auto Shut-off', 'Boil-dry Protection'],
      description: 'Fast-boiling electric kettle with safety features and large capacity.',
      specifications: {
        'Capacity': '1.5L',
        'Power': '3000W',
        'Material': 'Stainless Steel',
        'Features': 'Auto Shut-off',
        'Boil Time': '3 minutes'
      },
      images: [
        'https://images.unsplash.com/photo-1598970605070-1d4e1e1b5a5a?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 12,
      name: 'Coffee Maker',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      category: 'Kitchen',
      brand: 'Nespresso',
      rating: 4.6,
      features: ['Programmable', 'Thermal Carafe', 'Auto Clean'],
      description: 'Programmable coffee maker with thermal carafe for perfect coffee every time.',
      specifications: {
        'Type': 'Drip Coffee Maker',
        'Capacity': '12 Cups',
        'Carafe': 'Thermal',
        'Features': 'Programmable, Auto Clean',
        'Brew Time': '6-8 minutes'
      },
      images: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1585738400023-4e8c51b13d54?w=600&h=600&fit=crop'
      ]
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart

    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by price range
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        if (filters.priceRange === 'under100') return product.price < 100;
        if (filters.priceRange === '100-500') return product.price >= 100 && product.price <= 500;
        if (filters.priceRange === '500-1000') return product.price > 500 && product.price <= 1000;
        if (filters.priceRange === 'over1000') return product.price > 1000;
        return true;
      });
    }

    // Filter by brand
    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Sort products
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const clearAllFilters = () => {
    setFilters({
      priceRange: 'all',
      brand: 'all',
      category: 'all',
      sortBy: 'featured'
    });
  };

  return (
    <div className="electronics">
      <Header />

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="electronicsMain">
        {/* Left Sidebar - Filters */}
        <div className="electronics__left">
          <div className="electronicsNavigation">
            <h3>FILTERS</h3>

            {/* Price Range Filter */}
            <div className="filterGroup">
              <h4>PRICE RANGE</h4>
              <div className="filterOptions">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under100', label: 'Under $100' },
                  { value: '100-500', label: '$100 - $500' },
                  { value: '500-1000', label: '$500 - $1000' },
                  { value: 'over1000', label: 'Over $1000' }
                ].map(option => (
                  <div key={option.value} className="filterOption">
                    <input
                      type="radio"
                      name="priceRange"
                      value={option.value}
                      checked={filters.priceRange === option.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    />
                    <span className="checkmark"></span>
                    <span className="labelText">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filterGroup">
              <h4>BRAND</h4>
              <div className="filterOptions">
                {['all', 'Samsung', 'LG', 'Daikin', 'Panasonic', 'iRobot', 'Bosch', 'Kent', 'Dyson', 'Philips', 'Sony', 'Nespresso'].map(brand => (
                  <div key={brand} className="filterOption">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                    />
                    <span className="checkmark"></span>
                    <span className="labelText">{brand === 'all' ? 'All Brands' : brand}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="filterGroup">
              <h4>CATEGORY</h4>
              <div className="filterOptions">
                {['all', 'Kitchen', 'Laundry', 'Cooling', 'Cleaning', 'Air Quality', 'Entertainment'].map(category => (
                  <div key={category} className="filterOption">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    />
                    <span className="checkmark"></span>
                    <span className="labelText">{category === 'all' ? 'All Categories' : category}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="applyFilters" onClick={clearAllFilters}>
              CLEAR ALL FILTERS
            </button>
          </div>
        </div>

        {/* Right Content - Products Grid */}
        <div className="electronics__right">
          <div className="electronicsHeader">
            <div className="electronicsBreadcrumbLink">
              <a href="/">HOME</a> / <span>HOME APPLIANCES</span>
            </div>
            <div className="filterLeft" onClick={() => setIsDrawerOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <p>MENU</p>
            </div>
          </div>

          {/* Products Header */}
          <div className="productsHeader">
            <div>
              <h1>Home Appliances</h1>
              <p className="productsCount">Showing {filteredProducts.length} products</p>
            </div>
            <div className="sortOptions">
              <label>Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="sortSelect"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="productsGrid">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="productCard"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="productImage">
                  <img src={product.image} alt={product.name} />
                  <div className="productCategory">{product.category}</div>
                </div>

                <div className="productContent">
                  <div className="productBrand">{product.brand}</div>
                  <h3 className="productTitle">{product.name}</h3>

                  <div className="productRating">
                    <div className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="ratingValue">{product.rating}</span>
                  </div>

                  <div className="productFeatures">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="featureTag">{feature}</span>
                    ))}
                  </div>

                  <div className="productFooter">
                    <div className="productPrice">${product.price.toFixed(2)}</div>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="addToCartButton"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="noProducts">
              <h3>No products found</h3>
              <p>Try adjusting your filters to see more results.</p>
              <button
                onClick={clearAllFilters}
                className="clearFiltersBtn"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawerHeader">
          <p>FILTERS</p>
          <div className="closeButton" onClick={() => setIsDrawerOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div className="drawerContent">
          <div className="electronicsNavigation mobile">
            {/* Price Range Filter */}
            <div className="filterGroup">
              <h4>PRICE RANGE</h4>
              <div className="filterOptions">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under100', label: 'Under $100' },
                  { value: '100-500', label: '$100 - $500' },
                  { value: '500-1000', label: '$500 - $1000' },
                  { value: 'over1000', label: 'Over $1000' }
                ].map(option => (
                  <div key={option.value} className="filterOption">
                    <input
                      type="radio"
                      name="priceRange"
                      value={option.value}
                      checked={filters.priceRange === option.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    />
                    <span className="checkmark"></span>
                    <span className="labelText">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filterGroup">
              <h4>BRAND</h4>
              <div className="filterOptions">
                {['all', 'Samsung', 'LG', 'Daikin', 'Panasonic', 'iRobot', 'Bosch', 'Kent', 'Dyson', 'Philips', 'Sony', 'Nespresso'].map(brand => (
                  <div key={brand} className="filterOption">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                    />
                    <span className="checkmark"></span>
                    <span className="labelText">{brand === 'all' ? 'All Brands' : brand}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="filterGroup">
              <h4>CATEGORY</h4>
              <div className="filterOptions">
                {['all', 'Kitchen', 'Laundry', 'Cooling', 'Cleaning', 'Air Quality', 'Entertainment'].map(category => (
                  <div key={category} className="filterOption">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    />
                    <span className="checkmark"></span>
                    <span className="labelText">{category === 'all' ? 'All Categories' : category}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="applyFilters" onClick={clearAllFilters}>
              CLEAR ALL FILTERS
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeAppliances;