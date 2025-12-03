import React, { useState, useEffect } from 'react';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import './Electronics.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Electronics = () => {
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(''); // Add this state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products/category/Electronics');
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

  // Get unique subcategories with counts
  const getSubCategoriesWithCounts = () => {
    const counts = products.reduce((acc, product) => {
      const subCatName = product.subCategory ? product.subCategory.name : 'Other';
      acc[subCatName] = (acc[subCatName] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'all', count: products.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count }))
    ];
  };

  const subCategories = getSubCategoriesWithCounts();

  // Get filtered and sorted products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by subcategory
    if (activeSubCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.subCategory && product.subCategory.name === activeSubCategory
      );
    }

    // Filter by search query - ADD THIS SECTION
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.brand && product.brand.toLowerCase().includes(query))
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Get tab color based on index
  const getTabColor = (index) => {
    const colors = ['blue', 'pink', 'green', 'purple', 'orange', 'indigo'];
    return colors[index % colors.length];
  };

  const getActiveColor = () => {
    const index = subCategories.findIndex(cat => cat.name === activeSubCategory);
    return getTabColor(index);
  };

  const activeColor = getActiveColor();
  const activeTabIndex = subCategories.findIndex(cat => cat.name === activeSubCategory);

  if (loading) return <div className="electronics">Loading...</div>;
  if (error) return <div className="electronics">{error}</div>;

  return (
    <div className="electronics">
      <Header />

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="electronicsMain">
        <div className="electronics__right" style={{ width: '100%', }}>
          <div style={{ marginBottom: '0' }}>
            {/* Subcategory Tabs */}
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {subCategories.map((subCat, index) => {
                const color = getTabColor(index);
                const isActive = activeSubCategory === subCat.name;

                return (
                  <button
                    key={subCat.name}
                    onClick={() => setActiveSubCategory(subCat.name)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderTopLeftRadius: '0.5rem',
                      borderTopRightRadius: '1.5rem',
                      borderBottomLeftRadius: '0',
                      borderBottomRightRadius: '0',
                      borderLeft: isActive ? `2px solid var(--${color}-500, #323436ff)` : '2px solid transparent',
                      borderRight: isActive ? `2px solid var(--${color}-500, #323436ff)` : '2px solid transparent',
                      borderTop: isActive ? `2px solid var(--${color}-500, #323436ff)` : '2px solid transparent',
                      borderBottom: isActive ? '2px solid white' : '2px solid transparent',
                      backgroundColor: isActive ? 'white' : '#eaeff7ff',
                      color: isActive ? `var(--${color}-600, #323436ff)` : '#6b7280',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                      zIndex: isActive ? 10 : 1,
                      textTransform: 'capitalize',
                      marginBottom: isActive ? '-2px' : '0'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#eaeff7ff';
                    }}
                  >
                    <span>{subCat.name === 'all' ? 'All' : subCat.name}</span>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>{subCat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Container with Connected Border */}
          <div
            style={{
              border: `2px solid var(--${activeColor}-500, #1d3c5aff)`,
              borderTopLeftRadius: activeTabIndex === 0 ? '0' : '1.75rem',
              borderTopRightRadius: '0.75rem',
              borderBottomLeftRadius: '0.75rem',
              borderBottomRightRadius: '0.75rem',
              backgroundColor: 'white',
              padding: '1.5rem',
              marginTop: '0',
              transition: 'border-color 0.2s, border-radius 0.2s'
            }}
          >
            {/* Search and Sort Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                minWidth: '200px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery} // Add this
                  onChange={(e) => setSearchQuery(e.target.value)} // Add this
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 'none',
                    color: '#374151'
                  }}
                />
                {/* Add clear button for search */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9ca3af',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.625rem 1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Optional: Show search results summary */}
            {searchQuery && (
              <div style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                Search results for "{searchQuery}" ({filteredProducts.length} products found)
              </div>
            )}

            {/* Products Grid */}
            <div className="productsGrid">
              {filteredProducts.map(product => (
                <div
                  key={product._id}
                  className="productCard"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="productImage">
                    <img
                      src={product.images && product.images.length > 0
                        ? `http://localhost:5000${product.images[0]}`
                        : 'https://via.placeholder.com/400'
                      }
                      alt={product.name}
                    />
                  </div>

                  <div className="productContent">
                    <h3 className="productTitle">{product.name}</h3>

                    <div className="productRating">
                      <div className="stars">
                        {'★'.repeat(4)}
                        {'☆'.repeat(1)}
                      </div>
                      <span className="ratingValue">4.0</span>
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
                <p>
                  {searchQuery
                    ? `No products matching "${searchQuery}" found. Try a different search term.`
                    : 'Try selecting a different category.'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Electronics;