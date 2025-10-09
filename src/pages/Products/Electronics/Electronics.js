import React, { useState } from 'react';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import './Electronics.css';
import { useNavigate } from 'react-router-dom';

const Electronics = () => {
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
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      category: 'Audio',
      brand: 'Sony',
      rating: 4.5,
      features: ['Noise Cancelling', '30hr Battery', 'Fast Charging'],
      description: 'Premium wireless headphones with active noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
      specifications: {
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.0',
        'Weight': '250g',
        'Color': 'Black',
        'Charging Time': '2 hours'
      },
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      category: 'Wearables',
      brand: 'Apple',
      rating: 4.8,
      features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
      description: 'Advanced smartwatch with comprehensive health monitoring and premium features for an active lifestyle.',
      specifications: {
        'Display': '1.9 inch AMOLED',
        'Battery': '7 days',
        'Water Resistance': '50m',
        'Compatibility': 'iOS & Android',
        'Storage': '8GB'
      },
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1434493652601-87ccdd2650f8?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Laptop Computer 15"',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      category: 'Computers',
      brand: 'Dell',
      rating: 4.6,
      features: ['Intel i7', '16GB RAM', '512GB SSD'],
      description: 'High-performance laptop designed for professionals and creatives with powerful processing capabilities.',
      specifications: {
        'Processor': 'Intel Core i7',
        'RAM': '16GB DDR4',
        'Storage': '512GB SSD',
        'Display': '15.6" FHD',
        'Graphics': 'NVIDIA GTX 1650'
      },
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 4,
      name: '4K Action Camera',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      category: 'Cameras',
      brand: 'GoPro',
      rating: 4.7,
      features: ['4K Video', 'Waterproof', 'Image Stabilization'],
      description: 'Compact action camera capable of capturing stunning 4K video in any environment.',
      specifications: {
        'Video Resolution': '4K @ 60fps',
        'Waterproof': '10m',
        'Battery': '2 hours',
        'Weight': '158g',
        'Connectivity': 'WiFi & Bluetooth'
      },
      images: [
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 5,
      name: 'Wireless Gaming Mouse',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
      category: 'Accessories',
      brand: 'Logitech',
      rating: 4.4,
      features: ['RGB Lighting', '6 Buttons', 'Wireless'],
      description: 'Precision gaming mouse with customizable RGB lighting and ergonomic design.',
      specifications: {
        'DPI': '16000',
        'Connectivity': '2.4GHz Wireless',
        'Battery': '50 hours',
        'Buttons': '6 programmable',
        'Weight': '85g'
      },
      images: [
        'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 6,
      name: 'Portable Bluetooth Speaker',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      category: 'Audio',
      brand: 'JBL',
      rating: 4.5,
      features: ['360° Sound', 'Waterproof', '20hr Battery'],
      description: 'Portable speaker with immersive 360-degree sound and rugged waterproof design.',
      specifications: {
        'Output Power': '20W',
        'Battery Life': '20 hours',
        'Waterproof': 'IPX7',
        'Weight': '800g',
        'Connectivity': 'Bluetooth 5.1'
      },
      images: [
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&crop=faces'
      ]
    },
    {
      id: 7,
      name: 'Smartphone 128GB',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      category: 'Phones',
      brand: 'Samsung',
      rating: 4.6,
      features: ['5G', 'Triple Camera', '128GB Storage'],
      description: 'Flagship smartphone with advanced camera system and 5G connectivity.',
      specifications: {
        'Display': '6.7" AMOLED',
        'Storage': '128GB',
        'RAM': '8GB',
        'Camera': 'Triple 64MP',
        'Battery': '4500mAh'
      },
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 8,
      name: 'Tablet 10" Display',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
      category: 'Tablets',
      brand: 'Apple',
      rating: 4.7,
      features: ['10.9" Display', 'A14 Chip', '64GB Storage'],
      description: 'Powerful tablet with stunning display and professional-grade performance.',
      specifications: {
        'Display': '10.9" Liquid Retina',
        'Chip': 'A14 Bionic',
        'Storage': '64GB',
        'Camera': '12MP Ultra Wide',
        'Battery': 'All-day'
      },
      images: [
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 9,
      name: 'Mechanical Keyboard RGB',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop',
      category: 'Accessories',
      brand: 'Razer',
      rating: 4.5,
      features: ['Mechanical Switches', 'RGB', 'Wrist Rest'],
      description: 'Mechanical gaming keyboard with customizable RGB lighting and premium build quality.',
      specifications: {
        'Switch Type': 'Mechanical',
        'Backlight': 'RGB',
        'Keycaps': 'Double-shot PBT',
        'Connectivity': 'USB-C',
        'Weight': '1.2kg'
      },
      images: [
        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 10,
      name: 'Wireless Earbuds Pro',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      category: 'Audio',
      brand: 'Sony',
      rating: 4.8,
      features: ['Active Noise Cancel', '24hr Battery', 'Wireless Charging'],
      description: 'Premium wireless earbuds with industry-leading noise cancellation technology.',
      specifications: {
        'Battery Life': '24 hours with case',
        'Noise Cancellation': 'Active',
        'Connectivity': 'Bluetooth 5.2',
        'Water Resistance': 'IPX4',
        'Charging': 'Wireless & USB-C'
      },
      images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 11,
      name: 'USB-C Hub Adapter',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
      category: 'Accessories',
      brand: 'Anker',
      rating: 4.3,
      features: ['7-in-1', '4K HDMI', '100W PD'],
      description: 'Versatile USB-C hub that expands your connectivity options with multiple ports.',
      specifications: {
        'Ports': '7-in-1',
        'HDMI': '4K @ 60Hz',
        'Power Delivery': '100W',
        'USB Ports': '3x USB 3.0',
        'Ethernet': 'Gigabit'
      },
      images: [
        'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 12,
      name: 'External SSD 1TB',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
      category: 'Storage',
      brand: 'Samsung',
      rating: 4.7,
      features: ['1TB Capacity', 'USB 3.2', 'Compact Design'],
      description: 'High-speed external SSD with massive storage capacity and rugged design.',
      specifications: {
        'Capacity': '1TB',
        'Interface': 'USB 3.2 Gen 2',
        'Speed': '1050MB/s read',
        'Dimensions': '75 x 57 x 10.5mm',
        'Weight': '51g'
      },
      images: [
        'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop'
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
        if (filters.priceRange === 'under50') return product.price < 50;
        if (filters.priceRange === '50-200') return product.price >= 50 && product.price <= 200;
        if (filters.priceRange === '200-500') return product.price > 200 && product.price <= 500;
        if (filters.priceRange === 'over500') return product.price > 500;
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
                  { value: 'under50', label: 'Under $50' },
                  { value: '50-200', label: '$50 - $200' },
                  { value: '200-500', label: '$200 - $500' },
                  { value: 'over500', label: 'Over $500' }
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
                {['all', 'Apple', 'Samsung', 'Sony', 'Dell', 'Logitech', 'JBL', 'GoPro', 'Razer', 'Anker'].map(brand => (
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
                {['all', 'Audio', 'Wearables', 'Computers', 'Cameras', 'Accessories', 'Phones', 'Tablets', 'Storage'].map(category => (
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
              <a href="/">HOME</a> / <span>ELECTRONICS</span>
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
              <h1>Electronics</h1>
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
                  { value: 'under50', label: 'Under $50' },
                  { value: '50-200', label: '$50 - $200' },
                  { value: '200-500', label: '$200 - $500' },
                  { value: 'over500', label: 'Over $500' }
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
                {['all', 'Apple', 'Samsung', 'Sony', 'Dell', 'Logitech', 'JBL', 'GoPro', 'Razer', 'Anker'].map(brand => (
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
                {['all', 'Audio', 'Wearables', 'Computers', 'Cameras', 'Accessories', 'Phones', 'Tablets', 'Storage'].map(category => (
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

export default Electronics;