import { useEffect, useState } from 'react';
import { getAverageRating, isProductNew } from '../../utils';
import starSolid from '../../assets/images/components/star-solid.svg';
import './ProductPageItem.styles.scss';

const ProductPageItem = ({ product }) => {
  const { name, productImage, price, size, userRatings } = product;
  const [productAvgRating, setProductAvgRating] = useState();

  useEffect(() => {
    if (userRatings.length > 0) {
      setProductAvgRating(getAverageRating(product));
    }
  }, []);

  return (
    <div className='mb-4'>
      <div className='image-container'>
        <img className='product__image' src={productImage} alt='productImage' />
        <div className='product__overlay'>
          <div className='p-2 d-flex'>
            {productAvgRating ? (
              <div
                style={{ minWidth: '4rem', backgroundColor: '#eee' }}
                className='product__text-bubble d-flex align-items-center justify-content-center'
              >
                <div className='text-dark pe-1'>
                  {productAvgRating.toFixed(1)}
                </div>
                <img
                  src={starSolid}
                  style={{ width: 14, height: 14 }}
                  className='h-100'
                />
              </div>
            ) : null}
            {product.featured ? (
              <div className='product__text-bubble'>Featured</div>
            ) : null}
            {isProductNew(product) ? (
              <div className='product__text-bubble'>New</div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <div className='text-capitalize mt-1 fs-5'>{name}</div>
        <div className='fs-5' style={{ lineHeight: '.9' }}>
          ${price}
        </div>
      </div>
    </div>
  );
};

export default ProductPageItem;
