import React, { useState } from 'react';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
// import './Fashion.css';
import { useNavigate } from 'react-router-dom';
import FashionFilter from './FashionFilter';

const Fashion = () => {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    category: 'all',
    size: 'all',
    color: 'all',
    sortBy: 'featured'
  });

  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Classic Little Black Dress',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Zara',
      rating: 4.7,
      size: ['XS', 'S', 'M', 'L'],
      color: 'Black',
      features: ['Knee Length', 'Stretch Fabric', 'Machine Wash'],
      description: 'Timeless little black dress perfect for any occasion. Made from premium stretch fabric for comfort and fit.',
      specifications: {
        'Material': '95% Polyester, 5% Spandex',
        'Care': 'Machine Washable',
        'Length': 'Knee Length',
        'Neckline': 'Round Neck',
        'Sleeves': 'Short Sleeves'
      },
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'Floral Summer Maxi Dress',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'H&M',
      rating: 4.5,
      size: ['S', 'M', 'L', 'XL'],
      color: 'Multicolor',
      features: ['Floral Print', 'Flowy Fabric', 'Beach Wear'],
      description: 'Beautiful floral maxi dress perfect for summer occasions and beach vacations.',
      specifications: {
        'Material': '100% Viscose',
        'Care': 'Hand Wash Recommended',
        'Length': 'Maxi',
        'Neckline': 'V-Neck',
        'Style': 'Bohemian'
      },
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Elegant Cocktail Dress',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1566479179816-d53e1a73d0d3?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Mango',
      rating: 4.8,
      size: ['XS', 'S', 'M'],
      color: 'Navy Blue',
      features: ['Silk Blend', 'Evening Wear', 'Lined'],
      description: 'Sophisticated cocktail dress made from premium silk blend for special occasions.',
      specifications: {
        'Material': '80% Silk, 20% Nylon',
        'Care': 'Dry Clean Only',
        'Length': 'Above Knee',
        'Neckline': 'Sweetheart',
        'Closure': 'Hidden Zipper'
      },
      images: [
        'https://images.unsplash.com/photo-1566479179816-d53e1a73d0d3?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581404917879-53e18431bb15?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 4,
      name: 'Casual Cotton Shirt Dress',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Uniqlo',
      rating: 4.4,
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: 'White',
      features: ['Cotton', 'Belted', 'Everyday Wear'],
      description: 'Comfortable and versatile shirt dress perfect for casual outings and office wear.',
      specifications: {
        'Material': '100% Cotton',
        'Care': 'Machine Washable',
        'Length': 'Midi',
        'Pockets': '2 Side Pockets',
        'Style': 'Shirt Dress'
      },
      images: [
        'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 5,
      name: 'Wrap Bodycon Dress',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'ASOS',
      rating: 4.6,
      size: ['XS', 'S', 'M', 'L'],
      color: 'Red',
      features: ['Wrap Style', 'Bodycon Fit', 'Stretchy'],
      description: 'Flattering wrap dress that accentuates your figure. Perfect for date nights and parties.',
      specifications: {
        'Material': '92% Polyester, 8% Elastane',
        'Care': 'Machine Wash Cold',
        'Fit': 'Bodycon',
        'Style': 'Wrap',
        'Occasion': 'Evening'
      },
      images: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 6,
      name: 'Bohemian Off-Shoulder Dress',
      price: 109.99,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Free People',
      rating: 4.3,
      size: ['S', 'M', 'L'],
      color: 'Pink',
      features: ['Off-Shoulder', 'Ruffle Details', 'Bohemian'],
      description: 'Chic off-shoulder dress with beautiful ruffle details for a romantic bohemian look.',
      specifications: {
        'Material': '100% Cotton',
        'Care': 'Hand Wash',
        'Sleeves': 'Off-Shoulder',
        'Details': 'Ruffle Trim',
        'Style': 'Bohemian'
      },
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 7,
      name: 'Office Sheath Dress',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Ann Taylor',
      rating: 4.7,
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: 'Navy Blue',
      features: ['Professional', 'Pencil Cut', 'Structured'],
      description: 'Professional sheath dress perfect for office wear and business meetings.',
      specifications: {
        'Material': 'Wool Blend',
        'Care': 'Dry Clean Only',
        'Fit': 'Sheath',
        'Length': 'Knee Length',
        'Style': 'Professional'
      },
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 8,
      name: 'Knitted Sweater Dress',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Aritzia',
      rating: 4.5,
      size: ['XS', 'S', 'M', 'L'],
      color: 'Cream',
      features: ['Winter Wear', 'Cozy', 'Turtleneck'],
      description: 'Warm and cozy knitted sweater dress perfect for cold weather and winter styling.',
      specifications: {
        'Material': '100% Merino Wool',
        'Care': 'Hand Wash',
        'Neckline': 'Turtleneck',
        'Length': 'Midi',
        'Season': 'Winter'
      },
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 9,
      name: 'A-Line Party Dress',
      price: 139.99,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Reformation',
      rating: 4.8,
      size: ['XS', 'S', 'M'],
      color: 'Emerald Green',
      features: ['A-Line', 'Party Wear', 'Sequins'],
      description: 'Stunning A-line party dress with sequin details for special celebrations and events.',
      specifications: {
        'Material': 'Polyester with Sequins',
        'Care': 'Dry Clean Only',
        'Silhouette': 'A-Line',
        'Details': 'Sequin Embellishment',
        'Occasion': 'Party'
      },
      images: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 10,
      name: 'Denim Shirt Dress',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Levi\'s',
      rating: 4.4,
      size: ['XS', 'S', 'M', 'L'],
      color: 'Blue',
      features: ['Denim', 'Casual', 'Button Front'],
      description: 'Classic denim shirt dress that combines comfort with timeless style.',
      specifications: {
        'Material': '100% Cotton Denim',
        'Care': 'Machine Washable',
        'Style': 'Shirt Dress',
        'Closure': 'Button Front',
        'Pockets': '2 Front Pockets'
      },
      images: [
        'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 11,
      name: 'Lace Wedding Guest Dress',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Self-Portrait',
      rating: 4.9,
      size: ['XS', 'S', 'M', 'L'],
      color: 'Ivory',
      features: ['Lace Details', 'Wedding Guest', 'Elegant'],
      description: 'Elegant lace dress perfect for weddings and formal events.',
      specifications: {
        'Material': 'Lace Overlay',
        'Care': 'Dry Clean Only',
        'Details': 'Lace Appliqué',
        'Occasion': 'Formal',
        'Length': 'Midi'
      },
      images: [
        'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581404917879-53e18431bb15?w=600&h=600&fit=crop'
      ]
    },
    {
      id: 12,
      name: 'T-Shirt Dress',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop',
      category: 'Dresses',
      brand: 'Gap',
      rating: 4.2,
      size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      color: 'Grey',
      features: ['Comfortable', 'Everyday', 'Soft Fabric'],
      description: 'Ultra-comfortable t-shirt dress perfect for casual days and running errands.',
      specifications: {
        'Material': '100% Cotton Jersey',
        'Care': 'Machine Washable',
        'Fit': 'Relaxed',
        'Style': 'T-Shirt Dress',
        'Occasion': 'Casual'
      },
      images: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop'
      ]
    }
  ];

  const handleFilterChange = (filterType, value) => {
    console.log('Filter changed:', filterType, value); // Debug log
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
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filter by size
    if (filters.size !== 'all') {
      filtered = filtered.filter(product => product.size.includes(filters.size));
    }

    // Filter by color
    if (filters.color !== 'all') {
      filtered = filtered.filter(product => product.color === filters.color);
    }

    // Sort products
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    console.log('Filtered products count:', filtered.length); // Debug log
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

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
                  <div className="productColor">{product.color}</div>
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

                  <div className="sizeOptions">
                    <span className="sizeLabel">Sizes: </span>
                    {product.size.join(', ')}
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