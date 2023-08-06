import { useEffect, useState } from 'react';
import Product from '../../containers/Product/Product.jsx';

const ProductsPage = () => {
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
          <div key={index}>
            <Product product={product} />
          </div>
        );
      });
      
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  return <div className='d-flex'>{renderProducts()}</div>;
};
export default ProductsPage;
