import { useDispatch } from 'react-redux';
import { removeCartItem, addCartItem } from '../../store/cartItems/cartItemsSlice';

const CartItem = ({ product }) => {
  const { name, productImage, price, count, size } = product;
  const dispatch = useDispatch();

  const addAnotherItem = (e) => {
    e.preventDefault();
    dispatch(addCartItem(product));
  };

  const removeItem = (e) => {
    e.preventDefault();
    dispatch(removeCartItem(product));
  };

  return (
    <div className='d-flex mb-3 mt-3'>
      <img
        className='me-3'
        style={{ width: '120px' }}
        src={`/src/assets/images/products/${productImage}`}
        alt='productImage'
      />
      <div className='d-flex justify-content-between'>
        <div className='me-3 d-flex flex-column justify-content-between'>
          <h4 className='text-capitalize'>{name}</h4>
          <p className='fs-6 text-uppercase'>{size}</p>

          <div className='d-flex align-items-center'>
            <button className='btn btn-secondary' onClick={removeItem}>
              -
            </button>
            <p className='m-0 ms-2 me-2'>Quantity: {count}</p>
            <button className='btn btn-secondary' onClick={addAnotherItem}>
              +
            </button>
          </div>
        </div>
        <p className='fs-5 mb-2'>${price}</p>
      </div>
    </div>
  );
};

export default CartItem;
