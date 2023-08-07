const CartItem = ({ product }) => {
  const { name, productImage, price, count, size } = product;

  return (
    <div className='d-flex mb-3 mt-3'>
      <img
        className='me-3'
        style={{ width: '120px' }}
        src={`/src/assets/images/products/${productImage}`}
        alt='productImage'
      />
      <div className="d-flex justify-content-between'">
        <div className='me-3'>
          <h4 className='text-capitalize'>{name}</h4>
          <p className='fs-6 text-uppercase'>{size}</p>
          <div>Quantity: {count}</div>
        </div>
        <p className='fs-5 mb-2'>${price}</p>
      </div>
    </div>
  );
};

export default CartItem;
