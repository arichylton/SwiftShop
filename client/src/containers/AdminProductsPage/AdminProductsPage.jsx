import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductAdminItem from '../ProductAdminItem/ProductAdminItem';

const AdminProductsPage = () => {
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
          <div key={index} to={`/product/${product.docID}`} state={product}>
            <ProductAdminItem product={product} />
          </div>
        );
      });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  return (
    <div className='mt-5 pt-5'>
      <ul>{renderProducts()}</ul>
    </div>
  );
};
export default AdminProductsPage;
