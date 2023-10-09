import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../../assets/images/backgrounds/heroBackground_1.jpg';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';
import './ProductPage.scss';
import { isProductNew } from '../../utils';
import Button from '../button/button';
import themesCategory from '../../assets/images/backgrounds/themes_category.jpg';
import starSolid from '../../assets/images/components/star-solid.svg';
import truckFast from '../../assets/images/components/truck-fast-solid.svg';
import planeSolid from '../../assets/images/components/plane-solid.svg';
import summerCategorySolid from '../../assets/images/backgrounds/summer_category.jpg';
import winterCategorySolid from '../../assets/images/backgrounds/winter_category.jpg';

const ProductsPage = () => {
  const [productsData, setProductsData] = useState();
  const [heroFeature, setHeroFeature] = useState(null);

  useEffect(() => {
    fetch('/products-data').then(async (result) => {
      const { productsDataInfo } = await result.json();
      setProductsData(productsDataInfo);
    });
  }, []);

  // const renderProducts = () => {
  //   if (productsData) {
  //     return productsData.map((product, index) => {
  //       if (index > 3) {
  //         return;
  //       }
  //       return (
  //         <Link to={`/product/${product.docID}`} state={product} key={index}>
  //           <ProductPageItem product={product} />
  //         </Link>
  //       );
  //     });
  //   } else {
  //     return <div>No Product Information Yet</div>;
  //   }
  // };

  const renderNewProducts = () => {
    if (productsData) {
      return productsData
        .filter((product) => {
          return isProductNew(product);
        })
        .map((product, index) => {
          if (index > 3) {
            return;
          }
          return (
            <Link to={`/product/${product.docID}`} state={product} key={index}>
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
            <Link to={`/product/${product.docID}`} state={product} key={index}>
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
                <h1
                  className='text-white mb-5'
                  style={{ fontFamily: 'merriweather' }}
                >
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
          <section style={{ backgroundColor: '#eeeeee' }}>
            <div
              className='window--wide'
              style={{
                paddingTop: '30px',
                paddingBottom: '30px',
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
    <div className='d-flex flex-column align-items-center'>
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
                  <Button>Shop themes</Button>
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
                  <Button>Shop winter</Button>
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
                  <Button>Shop summer</Button>
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
          <div className='container d-flex flex-column justify-content-center align-items-center h-100 position-relative'>
            <h1
              style={{
                fontSize: '3rem',
                color: '#161625',
                marginTop: 30,
                paddingLeft: 40,
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
                paddingRight: 40,
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
          <div className='grid grid-cols-4'>{renderNewProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
