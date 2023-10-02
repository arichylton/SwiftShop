import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../../assets/images/backgrounds/heroBackground_1.jpg';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';
import './ProductPage.scss';
import { isProductNew } from '../../utils';
import Button from '../button/button';
import starSolid from '../../assets/images/components/star-solid.svg';
import truckFast from '../../assets/images/components/truck-fast-solid.svg';
import planeSolid from '../../assets/images/components/plane-solid.svg';

const ProductsPage = () => {
  const [productsData, setProductsData] = useState();
  const [heroFeature, setHeroFeature] = useState(null);

  useEffect(() => {
    fetch('/products-data').then(async (result) => {
      const { productsDataInfo } = await result.json();
      setProductsData(productsDataInfo);
    });
  }, []);

  const renderProducts = () => {
    if (productsData) {
      return productsData.map((product, index) => {
        return (
          <Link
            to={`/product/${product.docID}`}
            state={product}
            className='col-md-auto'
            key={index}
          >
            <ProductPageItem product={product} />
          </Link>
        );
      });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  const renderNewProducts = () => {
    if (productsData) {
      return productsData
        .filter((product) => {
          return isProductNew(product);
        })
        .map((product, index) => {
          return (
            <Link
              to={`/product/${product.docID}`}
              state={product}
              className='col-md-auto'
              key={index}
            >
              <ProductPageItem product={product} />
            </Link>
          );
        });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  const renderFeatured = () => {
    if (productsData) {
      return productsData
        .filter((product) => {
          if (heroFeature == null && product.featured == true) {
            setHeroFeature(product);
          }
          return product.featured == true;
        })
        .map((product, index) => {
          return (
            <Link
              to={`/product/${product.docID}`}
              state={product}
              className='col-md-auto'
              key={index}
            >
              <ProductPageItem product={product} />
            </Link>
          );
        });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  const renderHero = () => {
    if (heroFeature) {
      return (
        <div>
          <div className='image-container'>
            {/* Hero Background Image */}
            <img
              src={heroBackground}
              style={{ height: '88vh', width: '100vw', objectFit: 'cover' }}
              className='image'
            />

            {/* Overlay with Featured Products */}
            <div className='d-flex overlay'>
              <div
                style={{ width: '30%' }}
                className='text-center mb-5 justify-self-center'
              >
                <h1 className='text-white mb-5' style={{ fontFamily: 'merriweather'}}>
                  Bring Your Wardrobe to Life With Our Stunning Collection
                </h1>
                <div
                  className='d-flex justify-content-evenly m-auto'
                  style={{ width: '70%' }}
                >
                  <Button buttonType={'google'}>Shop Now</Button>
                  <Button buttonType={'inverted'}>Learn More</Button>
                </div>
                <div className='mt-5'>
                  <span className='text-white fs-4'>
                    ⭐⭐⭐⭐⭐ Over 1000+ 5 star reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
          <section>
            <div
              className='window--wide'
              style={{
                paddingTop: '36px',
                paddingBottom: '36px',
                width: '65%',
              }}
            >
              <div className='row'>
                <div className='col d-flex'>
                  <div className='me-3'>
                    <img
                      src={truckFast}
                      alt='truckFast'
                      style={{ width: '35px' }}
                    />
                  </div>
                  <div>
                    <div className='fs-4 fw-bold mb-2'>Free shipping</div>
                    <div className='fs-4'>
                      Spend over $50 to recieve free shipping on all orders.
                      Learn more
                    </div>
                  </div>
                </div>
                <div className='col d-flex'>
                  <div className='me-3'>
                    <img
                      src={planeSolid}
                      alt='planeSolid'
                      style={{ width: '35px' }}
                    />
                  </div>
                  <div>
                    <div className='fs-4 fw-bold mb-2'>
                      Fast Orders, Swift Delivery
                    </div>
                    <div className='fs-4'>
                      Swift Shop Express delivers speedy service for quick
                      satisfaction.
                    </div>
                  </div>
                </div>
                <div className='col d-flex'>
                  <div className='me-3'>
                    <img
                      src={starSolid}
                      alt='starSolid'
                      style={{ width: '35px' }}
                    />
                  </div>
                  <div>
                    <div className='fs-4 fw-bold mb-2'>
                      Elevating Satisfaction
                    </div>
                    <div className='fs-4'>
                      Satisfaction with quality products and stellar service.
                      Discover joy today.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  };
  renderFeatured();
  return (
    <div className='d-flex flex-column'>
      {renderHero()}
      <div className='m-5'>
        <div>
          <h4 className='fw-bold ms-3 fs-3 mb-4'style={{fontFamily: 'merriweather'}}>
            Featured
          </h4>
          <div className='row align-items-start'>{renderNewProducts()}</div>
        </div>
        <div>
          <h4 className='fw-bold ms-4 mt-3'>All</h4>
          <div className='row align-items-start'>{renderProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
