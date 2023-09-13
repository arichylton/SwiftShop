import { useDispatch, useSelector } from 'react-redux';
import {
  removeCartItem,
  addCartItem,
} from '../../store/cartItems/cartItemsSlice';
import { updateUserCart, removeUserCartItem } from '../../utils/firebase.utils';
import {
  addUserCartItem,
  removeFromUserCart,
} from '../../store/user/userSlice';

const CartItem = ({ product }) => {
  const { name, productImage, price, count, size, description } = product;
  const currentUser = useSelector((store) => store.USER.currentUser);
  const dispatch = useDispatch();

  const addAnotherItem = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUserCart(product);
      dispatch(addUserCartItem(product))
    } else {
      dispatch(addCartItem(product));
    }
  };

  const removeItem = (e) => {
    e.preventDefault();
    if (currentUser) {
      removeUserCartItem(product.docID, size)
      dispatch(removeFromUserCart(product))
    } else {
      dispatch(removeCartItem(product));
    }
  };

  return (
    <div className='d-flex mb-3 mt-3'>
      <img
        className='me-3'
        style={{ width: '140px' }}
        src={productImage}
        alt='productImage'
      />
      <div className='d-flex justify-content-between'>
        <div className='me-3 d-flex flex-column'>
          <h3 className='text-capitalize'>{name}</h3>
          <p className='fs-4 mb-1'>${price}</p>
          <p className='fs-5 text-uppercase'>{size}</p>

          <div className='d-flex align-items-center flex-fill'>
            <button className='btn btn-secondary' onClick={removeItem}>
              -
            </button>
            <p className='m-0 ms-2 me-2'>Quantity: {count}</p>
            <button className='btn btn-secondary' onClick={addAnotherItem}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
