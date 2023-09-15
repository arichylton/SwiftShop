import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../store/cartItems/cartItemsSlice';
import { addUserCartItem } from '../../store/user/userSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RatingIcons from '../../components/RatingIcons/RatingIcons';
import { updateUserCart } from '../../utils/firebase.utils';

const Product = () => {
  const location = useLocation();
  const [currentSize, setCurrentSize] = useState();
  const currentUser = useSelector((store) => store.USER.currentUser);
  const { name, productImage, price, sizes, description, productRating } =
    location.state;

  console.log(sizes)
  useEffect(() => {
    if (sizes['s'] != 0) {
      setCurrentSize('s');
    } else if (sizes['m'] != 0) {
      setCurrentSize('m');
    } else if (sizes['l'] != 0) {
      setCurrentSize('l');
    } else if (sizes['xl'] != 0) {
      setCurrentSize('xl');
    }
  }, []);

  const dispatch = useDispatch();

  const changeSize = (cSize) => {
    setCurrentSize(cSize);
  };

  const addToCart = (e) => {
    e.preventDefault();
    const cartItem = { ...location.state, size: currentSize };
    if (currentUser) {
      updateUserCart(cartItem);
      dispatch(addUserCartItem(cartItem))
    } else {
      dispatch(addCartItem(cartItem));
    }
  };

  return (
    <section className='container d-flex justify-content-center mt-5'>
      <div className='p-5 text-center'>
        <img
          style={{ width: '30vw' }}
          src={productImage}
          alt='productImage'
        />
      </div>
      <div className='vr'></div>
      <div className='p-5 d-flex flex-column'>
        <h2 className='text-capitalize fw-bold'>{name}</h2>
        <RatingIcons userRating={productRating} />
        <h4 className='mt-2 mb-2 fs-3'>${price}</h4>
        <p className='m-1 mt-4 fs-5'>
          Size: {currentSize && currentSize.toUpperCase()}
        </p>
        <div className='list-group list-group-horizontal w-50'>
          <button
            onClick={() => changeSize('s')}
            type='button'
            className={`list-group-item list-group-item-action text-center ${
              sizes.s != 0 ? '' : `disabled text-danger`
            } ${currentSize === 's' ? 'active' : ''}`}
          >
            S
          </button>
          <button
            onClick={() => changeSize('m')}
            type='button'
            className={`list-group-item list-group-item-action text-center ${
              sizes.m != 0 ? '' : `disabled text-danger `
            } ${currentSize === 'm' ? 'active' : ''}`}
          >
            M
          </button>
          <button
            onClick={() => changeSize('l')}
            type='button'
            className={`list-group-item list-group-item-action text-center${
              sizes.l != 0 ? '' : `disabled text-danger`
            } ${currentSize === 'l' ? 'active' : ''}`}
          >
            L
          </button>
          <button
            onClick={() => changeSize('xl')}
            type='button'
            className={`list-group-item list-group-item-action text-center ${
              sizes.xl != 0 ? '' : `disabled text-danger`
            } ${currentSize === 'xl' ? 'active' : ''}`}
          >
            XL
          </button>
        </div>
        <button
          className='btn btn-primary ps-4 pe-4 mt-4 mb-4 w-50'
          onClick={addToCart}
        >
          Add To Cart
        </button>
        <p className='mb-1 fw-bold'>Description: </p>
        <h3 className='fs-5'>{description}</h3>
      </div>
    </section>
  );
};

export default Product;
