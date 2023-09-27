import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div style={{marginTop: '150px'}}>
      <Link className='btn btn-primary' to='new'>Create New Product</Link>
      <div>{renderProducts()}</div>
    </div>
  );
};
export default AdminProductsPage;
