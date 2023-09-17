import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';

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
          <Link key={index} to={`/product/${product.docID}`} state={product}>
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
            setHeroFeature(product)
          }
          return product.featured == true;
        })
        .map((product, index) => {
          return (
            <Link key={index} to={`/product/${product.docID}`} state={product}>
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
          <img
            src={heroFeature.productImage}
            alt=''
            style={{ width: '700px', aspectRatio: '1/1' }}
          />
        </div>
      );
    }
  }

  return (
    <div className='d-flex flex-column'>
      {renderHero()}
      <h4 className='fw-bold ms-4 mt-3'>Featured</h4>
      <div className='d-flex '>{renderFeatured()}</div>
      <h4 className='fw-bold ms-4'>New</h4>
      <div className='d-flex '>{renderProducts()}</div>
      <h4 className='fw-bold ms-4 mt-3'>All</h4>
      <div className='d-flex '>{renderProducts()}</div>
    </div>
  );
};

export default ProductsPage;
