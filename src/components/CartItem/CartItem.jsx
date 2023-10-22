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
      dispatch(addUserCartItem(product));
    } else {
      dispatch(addCartItem(product));
    }
  };

  const removeItem = (e) => {
    e.preventDefault();
    if (currentUser) {
      removeUserCartItem(product.docID, size);
      dispatch(removeFromUserCart(product));
    } else {
      dispatch(removeCartItem(product));
    }
  };

  return (
    <div className='d-flex mb-3 mt-3 w-100 ps-3'>
      <img
        className='me-3'
        style={{ width: '120px' }}
        src={productImage}
        alt='productImage'
      />
      <div className='d-flex justify-content-between'>
        <div className='me-3 d-flex flex-column'>
          <h4 className='text-capitalize mb-0 fst-italic'>{name}</h4>
          <p className='fs-5 mt-1'>${price}</p>
          <p className='text-uppercase fw-bold'>{size}</p>

          <div className='d-flex align-items-center flex-fill'>
            <button
              className='button-17 p-0 me-2'
              onClick={removeItem}
              style={{ width: '30px', height: 'auto' }}
            >
              <span className='fs-4'>-</span>
            </button>
            <p className='m-0 fs-6'>Quantity: {count}</p>
            <button
              className='button-17 p-0 ms-2'
              onClick={addAnotherItem}
              style={{ width: '30px', height: 'auto' }}
            >
              <span className='fs-4'>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
