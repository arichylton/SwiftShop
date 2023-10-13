import { useEffect, useState } from 'react';
import Button from '../components/button/button.jsx';
import { Link } from 'react-router-dom';
import ProductPageItem from '../containers/ProductPageItem/ProductPageItem.jsx';

const All = () => {
  const [productsData, setProductsData] = useState();

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
  return (
    <div className='d-flex flex-column mt-5'>
      <div style={{ paddingBottom: 100 }}>
        <div
          className='pb-4 mb-3'
          style={{
            fontFamily: 'merriweather',
            backgroundColor: '#eee',
            minWidth: '100vw',
            paddingTop: '150px',
          }}
        >
          <div
            className='fw-bold container'
            style={{
              fontFamily: 'merriweather',
              fontSize: '2.4rem',
            }}
          >
            All
          </div>
        </div>
        <div
          className='container mb-5 pb-3 p-0 d-flex gap-2'
          style={{ borderBottom: 'solid 1px #d9d9d9' }}
        >
          <Button>Sort</Button>
          <Button>Availability</Button>
        </div>
        <div className='grid grid-cols-4 container p-0'>{renderProducts()}</div>
      </div>
    </div>
  );
};
export default All;
