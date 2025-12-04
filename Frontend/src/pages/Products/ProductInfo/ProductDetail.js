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
            {/* Commented out navigation buttons
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
            */}
          </div>
        </div>

        {/* Product Details */}
        <div className="productDetails">
          <div className="productName">
            <h1>{product.name}</h1>
          </div>

          <div className="productPrice">
            <h3>Rs.{product.price.toFixed(2)}</h3>
          </div>



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

          <div className="productSpecifications">
            <h2>Product Specifications</h2>
            <div className="specsGrid">
              <div className="specItem">
                <span className="specLabel">Category:</span>
                <span className="specValue">{product.category?.name || 'N/A'}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Subcategory:</span>
                <span className="specValue">{product.subCategory?.name || 'N/A'}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Details:</span>
                <span className="specValue">{product.description}</span>
              </div>
              <div className="specItem">
                <span className="specLabel">Stock:</span>
                <span className="specValue">{product.stock || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="productTags">
            <p>Tags: <span>{product.category?.name}, {product.subCategory?.name}</span></p>
          </div>
        </div>
      </div>

      {/* Additional Sections - Can add related products here if needed */}
      <div className="productAdditionalSections">
        {/* You can add related products section here */}
        {/* 
        <div className="relatedProducts">
          <h2>Related Products</h2>
          <div className="relatedProductsGrid">
            {/* Related products would go here */}
        {/* </div>
        </div>
        */}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;