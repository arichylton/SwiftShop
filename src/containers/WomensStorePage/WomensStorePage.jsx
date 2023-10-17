import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';
import { getAllProducts } from '../../utils/firebase.utils.js';

const WomensStorePage = () => {
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    getAllProducts.then(async (result) => {
      setProductsData(result);
    });
  }, []);

  const renderProducts = () => {
    if (productsData) {
      return productsData
        .filter((product) => {
          return product.gender === 'F';
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
  return (
    <div className='d-flex flex-column mt-5' style={{ paddingTop: '5%' }}>
      <h4 className='fw-bold ms-4'>Womens</h4>
      <div className='d-flex '>{renderProducts()}</div>
    </div>
  );
};
export default WomensStorePage;
