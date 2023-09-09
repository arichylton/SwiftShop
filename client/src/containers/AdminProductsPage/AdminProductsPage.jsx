import { useEffect, useState } from 'react';
import ProductAdminItem from '../ProductAdminItem/ProductAdminItem';

const AdminProductsPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [productChangeMade, setProductChangeMade] = useState(false);

  useEffect(() => {
    fetch('/products-data').then(async (result) => {
      const { productsDataInfo } = await result.json();
      setProductsData(productsDataInfo);
    });
  }, [productChangeMade]);

  const toggleChangeMade = () => {
    setProductChangeMade(!productChangeMade)
  }

  const renderProducts = () => {
    if (productsData) {
      return productsData.map((product, index) => {
        return (
          <div key={index}>
            <ProductAdminItem
              product={product}
              toggleChangeMade={toggleChangeMade}
            />
          </div>
        );
      });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  return (
    <div className='mt-5 pt-5' style={{paddingTop: '300px'}}>
      <button className='btn btn-primary'>Create New Product</button>
      <div>{renderProducts()}</div>
    </div>
  );
};
export default AdminProductsPage;
