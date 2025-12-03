import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import './ProductDetail.css';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        if (response.data.success) {
          setProduct(response.data.product);
          // Initialize defaults if available (assuming schema might have sizes/colors in future or using description)
          // Currently schema doesn't have sizes/colors, so we might skip this or use mock data if needed.
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification('Please login to add items to cart');
        setTimeout(() => setNotification(''), 3000);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId: product._id, quantity: quantity },
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

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${product.name}`);
  };

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) return <div className="productSection">Loading...</div>;
  if (error || !product) {
    return (
      <div className="productSection">
        <Header />
        <div className="product-not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="productSection">
      <Header />

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Product Showcase Section */}
      <div className="productShowCase">
        {/* Product Gallery */}
        <div className="productGallery">
          <div className="productThumb">
            {product.images && product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000${img}`}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>

          <div className="productFullImg">
            <img
              src={product.images && product.images.length > 0 ? `http://localhost:5000${product.images[selectedImage]}` : 'https://via.placeholder.com/600'}
              alt={product.name}
            />
            <div className="buttonsGroup">
              <button className="directionBtn" onClick={prevImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="directionBtn" onClick={nextImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="productDetails">
          <div className="productBreadcrumb">
            <div className="breadcrumbLink">
              <a href="/">HOME</a> / <a href={`/${product.category.name.toLowerCase()}`}>{product.category.name.toUpperCase()}</a> / <span>{product.name.toUpperCase()}</span>
            </div>
          </div>

          <div className="productName">
            <h1>{product.name}</h1>
          </div>

          <div className="productRating">
            <div className="stars">
              {'★'.repeat(4)} {/* Mock rating */}
              {'☆'.repeat(1)}
            </div>
            <p>(4.0)</p>
          </div>

          <div className="productPrice">
            <h3>${product.price.toFixed(2)}</h3>
          </div>

          <div className="productDescription">
            <p>{product.description}</p>
          </div>

          {/* Size Selection - Mocked or Hidden if not in schema */}
          {/* 
          <div className="productSizeColor">
            <div className="productSize">
              <p>Size:</p>
              <div className="sizeBtn">
                <button>S</button>
                <button>M</button>
                <button>L</button>
              </div>
            </div>
          </div>
          */}

          <div className="productCartQuantity">
            <div className="productQuantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div className="productCartBtn">
              <button onClick={handleAddToCart}>ADD TO CART</button>
            </div>
          </div>

          <div className="productWishShare">
            <div className="productWishList">
              <button>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <p>WISHLIST</p>
              </button>
            </div>
            <div className="productShare">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              SHARE
            </div>
          </div>

          <div className="productTags">
            <p>Tags: <span>{product.category.name}, {product.subCategory.name}</span></p>
          </div>
        </div>
      </div>

      {/* Additional Sections - Specifications and Related Products */}
      <div className="productAdditionalSections">
        {/* Product Specifications Section */}
        <div className="productSpecifications">
          <h2>Product Specifications</h2>
          <div className="specsGrid">
            {/* Mock specs or from description? Schema doesn't have specs object. */}
            <div className="specItem">
              <span className="specLabel">Category:</span>
              <span className="specValue">{product.category.name}</span>
            </div>
            <div className="specItem">
              <span className="specLabel">SubCategory:</span>
              <span className="specValue">{product.subCategory.name}</span>
            </div>
            <div className="specItem">
              <span className="specLabel">Stock:</span>
              <span className="specValue">{product.stock}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;