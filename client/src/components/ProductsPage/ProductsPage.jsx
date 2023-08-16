import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductPageItem from '../../containers/ProductPageItem/ProductPageItem.jsx';

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
          <Link
            key={index}
            to={`/product/${product.docID}`}
            state={ product }
          >
            <ProductPageItem product={product} />
          </Link>
        );
      });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  return <div className='d-flex'>{renderProducts()}</div>;
};
export default ProductsPage;
