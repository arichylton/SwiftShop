import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import summerBackground from '../../assets/images/backgrounds/summer_background.jpg';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';
import './ProductPage.scss';
import { isProductNew } from '../../utils';

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
          <div className='col-md-auto' key={index}>
            <Link to={`/product/${product.docID}`} state={product}>
              <ProductPageItem product={product} />
            </Link>
          </div>
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
          console.log(isProductNew(product))
          return isProductNew(product);
        })
        .map((product, index) => {
          return (
            <Link key={index} to={`/product/${product.docID}`} state={product}>
              <div className='m-4 text-center col'>
                <img
                  style={{ width: '240px', borderRadius: '5px' }}
                  src={product.productImage}
                  alt='productImage'
                />
                <h4 className='text-capitalize mt-2 mb-1'>{product.name}</h4>
                <p className='fs-4'>${product.price}</p>
              </div>
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
            <Link key={index} to={`/product/${product.docID}`} state={product}>
              <div className='m-4 text-center col'>
                <img
                  style={{ width: '240px', borderRadius: '5px' }}
                  src={product.productImage}
                  alt='productImage'
                />
                <h4 className='text-capitalize mt-2 mb-1'>{product.name}</h4>
                <p className='fs-4'>${product.price}</p>
              </div>
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
        <div className='image-container'>
          {/* Hero Background Image */}
          <img src={summerBackground} alt='' className='image' />

          {/* Overlay with Featured Products */}
          <div className='d-flex overlay'>{renderFeatured()}</div>
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
          <h4 className='fw-bold ms-4'>New</h4>
          <div className='row'>{renderNewProducts()}</div>
        </div>
        <div>
          <h4 className='fw-bold ms-4 mt-3 '>All</h4>
          <div className='row align-items-start'>{renderProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
