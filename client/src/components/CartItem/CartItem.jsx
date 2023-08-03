const CartItem = ({ product }) => {
  const { name, productImage, productCategories, price, size } = product;

  return (
    <div className='m-4 d-flex align-items-start'>
      <img
        className='me-3'
        style={{ width: '100px' }}
        src={`/src/assets/images/products/${productImage}`}
        alt='productImage'
      />
      <div className="d-flex">
        <div className='me-3'>
          <h4 className='text-capitalize'>{name}</h4>

          <p className='fs-6 text-uppercase'>{size}</p>
        </div>
        <p className='fs-5 mb-2'>${price}</p>
      </div>
    </div>
  );
};

export default CartItem;
