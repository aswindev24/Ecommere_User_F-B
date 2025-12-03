import React, { useState, useEffect } from 'react';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
// import './Fashion.css';
import { useNavigate } from 'react-router-dom';
import FashionFilter from './FashionFilter';
import axios from 'axios';

const Fashion = () => {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    category: 'all',
    size: 'all',
    color: 'all',
    sortBy: 'featured'
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products/category/Fashion');
        if (response.data.success) {
          setProducts(response.data.products);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterType, value) => {
    console.log('Filter changed:', filterType, value); // Debug log
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification('Please login to add items to cart');
        setTimeout(() => setNotification(''), 3000);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setNotification(`${product.name} added to cart!`);
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setNotification(error.response?.data?.message || 'Failed to add to cart');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    console.log('Current filters:', filters); // Debug log

    // Filter by price range
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        if (filters.priceRange === 'under50') return product.price < 50;
        if (filters.priceRange === '50-100') return product.price >= 50 && product.price <= 100;
        if (filters.priceRange === '100-150') return product.price > 100 && product.price <= 150;
        if (filters.priceRange === 'over150') return product.price > 150;
        return true;
      });
    }

    // Filter by brand
    if (filters.brand !== 'all') {
      // filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.subCategory && product.subCategory.name === filters.category);
    }

    // Filter by size
    if (filters.size !== 'all') {
      // filtered = filtered.filter(product => product.size && product.size.includes(filters.size));
    }

    // Filter by color
    if (filters.color !== 'all') {
      // filtered = filtered.filter(product => product.color === filters.color);
    }

    // Sort products
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    // else if (filters.sortBy === 'rating') {
    //   filtered.sort((a, b) => b.rating - a.rating);
    // }

    console.log('Filtered products count:', filtered.length); // Debug log
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Group by SubCategory
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const subCatName = product.subCategory ? product.subCategory.name : 'Other';
    if (!acc[subCatName]) acc[subCatName] = [];
    acc[subCatName].push(product);
    return acc;
  }, {});

  const clearAllFilters = () => {
    setFilters({
      priceRange: 'all',
      brand: 'all',
      category: 'all',
      size: 'all',
      color: 'all',
      sortBy: 'featured'
    });
  };

  if (loading) return <div className="electronics">Loading...</div>;
  if (error) return <div className="electronics">{error}</div>;

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
          <FashionFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
          />
        </div>

        {/* Right Content - Products Grid */}
        <div className="electronics__right">
          <div className="electronicsHeader">
            <div className="electronicsBreadcrumbLink">
              <a href="/">HOME</a> / <span>FASHION</span>
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
              <h1>Fashion Dresses</h1>
              <p className="productsCount">Showing {filteredProducts.length} dresses</p>
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

          {/* Products Grouped by SubCategory */}
          <div className="productsContainer">
            {Object.entries(groupedProducts).map(([subCategory, items]) => (
              <div key={subCategory} className="subCategorySection">
                <h2 className="subCategoryTitle">{subCategory}</h2>
                <div className="productsGrid">
                  {items.map(product => (
                    <div
                      key={product._id}
                      className="productCard"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div className="productImage">
                        <img src={product.images && product.images.length > 0 ? `http://localhost:5000${product.images[0]}` : 'https://via.placeholder.com/400'} alt={product.name} />
                        <div className="productCategory">{product.category.name}</div>
                        {/* <div className="productColor">{product.color}</div> */}
                      </div>

                      <div className="productContent">
                        {/* <div className="productBrand">{product.brand}</div> */}
                        <h3 className="productTitle">{product.name}</h3>

                        <div className="productRating">
                          <div className="stars">
                            {'★'.repeat(4)}
                            {'☆'.repeat(1)}
                          </div>
                          <span className="ratingValue">4.0</span>
                        </div>

                        {/* 
                        <div className="productFeatures">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="featureTag">{feature}</span>
                          ))}
                        </div>
                        */}

                        {/* 
                        <div className="sizeOptions">
                          <span className="sizeLabel">Sizes: </span>
                          {product.size.join(', ')}
                        </div>
                        */}

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
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="noProducts">
              <h3>No dresses found</h3>
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
          <FashionFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Fashion;