import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import './ProductDetail.css';

const allProducts = [
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
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#2c5530', '#767676', '#ffffff']
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
    ],
    sizes: ['38mm', '42mm', '46mm'],
    colors: ['#000000', '#2c5530', '#767676']
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
    ],
    sizes: ['13"', '15"', '17"'],
    colors: ['#000000', '#767676', '#ffffff']
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
    ],
    sizes: ['Standard', 'Pro'],
    colors: ['#000000', '#2c5530', '#767676']
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
    ],
    sizes: ['Standard', 'Large'],
    colors: ['#000000', '#2c5530', '#767676']
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
    ],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['#000000', '#2c5530', '#767676']
  }
];

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [productId]);

  const handleAddToCart = () => {
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${product.name}`);
  };

  const nextImage = () => {
    if (product.images) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (!product) {
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
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
          
          <div className="productFullImg">
            <img 
              src={product.images ? product.images[selectedImage] : product.image} 
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
              <a href="/">HOME</a> / <a href="/electronics">ELECTRONICS</a> / <span>{product.name.toUpperCase()}</span>
            </div>
            <div className="prevNextLink">
              <a href="#prev">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                PREV
              </a>
              <a href="#next">
                NEXT
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          <div className="productName">
            <h1>{product.name}</h1>
          </div>

          <div className="productRating">
            <div className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <p>({product.rating})</p>
          </div>

          <div className="productPrice">
            <h3>${product.price.toFixed(2)}</h3>
          </div>

          <div className="productDescription">
            <p>{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="productSizeColor">
              <div className="productSize">
                <p>Size:</p>
                <div className="sizeBtn">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={selectedSize === size ? 'selected' : ''}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="productSizeColor">
              <div className="productColor">
                <p>Color:</p>
                <div className="colorBtn">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      className={selectedColor === color ? 'highlighted' : ''}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

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
            <p>Tags: <span>Electronics, {product.category}, {product.brand}</span></p>
          </div>
        </div>
      </div>

      {/* Additional Sections - Specifications and Related Products */}
      <div className="productAdditionalSections">
        {/* Product Specifications Section */}
        <div className="productSpecifications">
          <h2>Product Specifications</h2>
          <div className="specsGrid">
            {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="specItem">
                <span className="specLabel">{key}:</span>
                <span className="specValue">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;