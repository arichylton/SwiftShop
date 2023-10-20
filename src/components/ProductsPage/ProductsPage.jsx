import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroBackground from '../../assets/images/backgrounds/heroBackground_1.jpg';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';
import './ProductPage.scss';
import { isProductNew } from '../../utils';
import { auth, getAllProducts } from '../../utils/firebase.utils';
import Button from '../button/button';
import themesCategory from '../../assets/images/backgrounds/themes_category.jpg';
import starSolid from '../../assets/images/components/star-solid.svg';
import truckFast from '../../assets/images/components/truck-fast-solid.svg';
import planeSolid from '../../assets/images/components/plane-solid.svg';
import summerCategorySolid from '../../assets/images/backgrounds/summer_category.jpg';
import { HashLink } from 'react-router-hash-link';
import winterCategorySolid from '../../assets/images/backgrounds/winter_category.jpg';

const ProductsPage = () => {
  const [productsData, setProductsData] = useState();
  const [heroFeature, setHeroFeature] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    console.log(user);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getAllProducts().then(async (result) => {
      setProductsData(result);
    });
  }, []);

  const renderNewProducts = () => {
    if (productsData) {
      return productsData
        .sort((a, b) => {
          return b.dateCreated.seconds - a.dateCreated.seconds;
        })
        .map((product, index) => {
          if (index > 3) {
            return;
          }
          return (
            <a
              style={{ cursor: 'pointer' }}
              key={index}
              onClick={() =>
                navigate(`/product/${product.docID}`, { state: product })
              }
            >
              <ProductPageItem product={product} />
            </a>
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
            <a
              style={{ cursor: 'pointer' }}
              key={index}
              onClick={() =>
                navigate(`/product/${product.docID}`, { state: product })
              }
            >
              <ProductPageItem product={product} />
            </a>
          );
        });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  const renderHero = () => {
    if (heroFeature) {
      return (
        <div className='w-100'>
          <div className='image-container w-100'>
            {/* Hero Background Image */}
            <img
              src={heroBackground}
              style={{ height: '88vh', objectFit: 'cover' }}
              className='w-100'
            />

            {/* Overlay with Featured Products */}
            <div className='d-flex overlay'>
              <div
                style={{ width: '30%' }}
                className='text-center mb-5 justify-self-center'
              >
                <h1
                  className='text-white mb-5'
                  style={{ fontFamily: 'merriweather' }}
                >
                  Bring Your Wardrobe to Life With Our Stunning Collection
                </h1>
                <div
                  className='d-flex justify-content-evenly m-auto gap-3'
                  style={{ width: '45%', maxWidth: '' }}
                >
                  <Button buttonType={'google'}>Shop Now</Button>
                  <Button buttonType={'inverted'}>
                    Learn More
                  </Button>
                </div>
                <div className='mt-5'>
                  <span className='text-white fs-4'>
                    <span className='fs-5' style={{ letterSpacing: 0.01 }}>
                      ⭐⭐⭐⭐⭐
                    </span>
                    Over 1000+ 5 star reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
          <section style={{ backgroundColor: '#eeeeee' }}>
            <div
              className='container'
              style={{
                paddingTop: '30px',
                paddingBottom: '30px',
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
    <div
      className='d-flex flex-column align-items-center'
      style={{ width: '100vw' }}
    >
      {renderHero()}
      <div className='m-5 d-flex flex-column container align-items-center'>
        <div
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
            gap: '10px',
            display: 'grid',
            paddingTop: 100,
            paddingBottom: 100,
          }}
        >
          <div
            style={{
              gridColumn: 'span 1 / span 1',
              gridRow: 'span 1 / span 1',
            }}
            className='h-full'
          >
            <div
              className='pt-0 pb-0 w-100 h-100'
              style={{
                borderRadius: '3px',
                borderWidth: '1px',
                borderColor: 'transparent',
                color: '#161625',
                overflow: 'hidden',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                flexDirection: 'row',
                position: 'relative',
                display: 'flex',
                backgroundColor: '#eeeeee',
              }}
            >
              <div className='w-100' style={{ position: 'relative' }}>
                <img src={themesCategory} alt='' className='w-100' />
              </div>
              <div
                className='w-100'
                style={{ paddingTop: '1rem', padding: '1rem', zIndex: '1' }}
              >
                <div style={{ maxWidth: '65ch' }}>
                  <h2 className='mb-2' style={{ fontFamily: 'merriweather' }}>
                    Themes
                  </h2>
                  <div className='mb-2'>
                    <p className='fs-5'>Find what style fits you</p>
                  </div>
                  <Link to='themes'>
                    <Button>Shop themes</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              gridColumn: 'span 1 / span 1',
              gridRow: 'span 1 / span 1',
            }}
            className='h-full'
          >
            <div
              className='pt-0 pb-0 w-100 h-100'
              style={{
                borderRadius: '3px',
                borderWidth: '1px',
                borderColor: 'transparent',
                color: '#161625',
                overflow: 'hidden',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                flexDirection: 'row',
                position: 'relative',
                display: 'flex',
                backgroundColor: '#eeeeee',
              }}
            >
              <div className='w-100' style={{ position: 'relative' }}>
                <img src={winterCategorySolid} alt='' className='w-100' />
              </div>
              <div
                className='w-100'
                style={{ paddingTop: '1rem', padding: '1rem', zIndex: '1' }}
              >
                <div style={{ maxWidth: '65ch' }}>
                  <h2 className='mb-2' style={{ fontFamily: 'merriweather' }}>
                    Winter
                  </h2>
                  <div className='mb-2'>
                    <p className='fs-5'>Stay warm with our winter collection</p>
                  </div>
                  <HashLink smooth to='/seasonal#winter'>
                    <Button>Shop winter</Button>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              gridColumn: 'span 1 / span 1',
              gridRow: 'span 1 / span 1',
            }}
            className='h-full'
          >
            <div
              className='pt-0 pb-0 w-100 h-100'
              style={{
                borderRadius: '3px',
                borderWidth: '1px',
                borderColor: 'transparent',

                overflow: 'hidden',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                flexDirection: 'row',
                position: 'relative',
                display: 'flex',
                backgroundColor: '#eeeeee',
              }}
            >
              <div className='w-100' style={{ position: 'relative' }}>
                <img
                  style={{ objectFit: 'cover' }}
                  src={summerCategorySolid}
                  alt=''
                  className='w-100 product__feature__overlay-img'
                />
              </div>
              <div
                className='w-100'
                style={{ paddingTop: '1rem', padding: '1rem', zIndex: '1' }}
              >
                <div style={{ maxWidth: '65ch' }}>
                  <h2 className='mb-2' style={{ fontFamily: 'merriweather' }}>
                    Summer
                  </h2>
                  <div className='mb-2'>
                    <p className='fs-5'>Perfect for hot summer days</p>
                  </div>
                  <HashLink smooth to='/seasonal#summer'>
                    <Button>Shop summer</Button>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: 200,
            width: '100vw',
            backgroundColor: '#eee',
            marginBottom: 60,
            paddingBottom: '.5rem',
            paddingTop: '.5rem',
            clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 70%)',
            borderTop: '1rem solid #161625',
            borderBottom: '1rem solid #161625',
          }}
        >
          <div className='container d-flex flex-column justify-content-center align-items-center h-100 position-relative p-0'>
            <h1
              style={{
                fontSize: '3rem',
                color: '#161625',
                marginTop: 30,
              }}
              className='position-absolute top-0 start-0'
            >
              Get Outside.
            </h1>
            <h1
              style={{ fontSize: '3rem', color: '#161625' }}
              className='position-absolute top-50 start-50 translate-middle'
            >
              Look Amazing.
            </h1>
            <h1
              style={{
                fontSize: '3rem',
                color: '#161625',
                marginBottom: 30,
              }}
              className='position-absolute bottom-0 end-0'
            >
              Be innovative.
            </h1>
          </div>
        </div>
        <div style={{ paddingBottom: 100 }}>
          <h4
            className='fw-bold ms-3 fs-3 mb-4'
            style={{ fontFamily: 'merriweather' }}
          >
            Featured
          </h4>
          <div className='grid grid-cols-4'>{renderFeatured()}</div>
        </div>
        <div style={{ paddingBottom: 100 }}>
          <h4
            className='fw-bold ms-3 fs-3 mb-4'
            style={{ fontFamily: 'merriweather' }}
          >
            New
          </h4>
          <div className='grid grid-cols-4 '>{renderNewProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
