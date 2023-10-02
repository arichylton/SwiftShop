import './ProductPageItem.styles.scss';

const ProductPageItem = ({ product }) => {
  const { name, productImage, price, size } = product;
  return (
    <div className='mb-3'>
      <div className='image-container'>
        <img className='product__image' src={productImage} alt='productImage' />
        <div className='product__overlay'>
          <div className='p-2 d-flex'>
            <div className='product__text-bubble'>Featured</div>
            <div className='product__text-bubble'>Best Seller</div>
          </div>
        </div>
      </div>
      <div>
        <div className='text-capitalize mt-1 fs-4'>{name}</div>
        <div className='fs-4'>${price}</div>
      </div>
    </div>
  );
};

export default ProductPageItem;
