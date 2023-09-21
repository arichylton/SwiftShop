import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../store/cartItems/cartItemsSlice';
import { addUserCartItem } from '../../store/user/userSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RatingIcons from '../../components/RatingIcons/RatingIcons';
import { Rating } from 'semantic-ui-react'
import { updateUserCart } from '../../utils/firebase.utils';

const Product = () => {
  const location = useLocation();
  const [currentSize, setCurrentSize] = useState();
  const [currentRating, setCurrentRating] = useState({rating: 3, maxRating: 5});
  const currentUser = useSelector((store) => store.USER.currentUser);
  const {
    name,
    productImage,
    price,
    sizes,
    description,
    productRating,
    featured,
  } = location.state;

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
      dispatch(addUserCartItem(cartItem));
    } else {
      dispatch(addCartItem(cartItem));
    }
  };

  const renderButtonSize = (size) => {
    return (
      <button
        onClick={() => changeSize(size)}
        type='button'
        className={`list-group-item list-group-item-action text-center ${
          sizes[size] != 0 ? '' : `disabled text-danger`
        } ${currentSize === size ? 'active' : ''}`}
      >
        {size.toUpperCase()}
      </button>
    );
  };

  const handleRate = (e, { rating, maxRating }) =>
    setCurrentRating({ rating, maxRating });

  const renderLeaveReview = () => {
    return (
      <div className='accordion accordian-flush mt-4' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              Leave a review!
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse show'
            aria-labelledby='headingOne'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <div className='mb-3'>
                <label for='exampleFormControlInput1' className='form-label'>
                  Title
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Goes well with a lot of my outfits!'
                />
              </div>
              <div className='mb-3'>
                <label for='exampleFormControlInput3' className='form-label'>
                  Rating
                </label>
                <Rating
                  icon='star'
                  defaultRating={3}
                  maxRating={5}
                  onRate={handleRate}
                />
                <pre>{JSON.stringify(currentRating, null, 2)}</pre>
              </div>
              <div className='mb-3'>
                <label for='exampleFormControlTextarea1' className='form-label'>
                  Description
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className='container d-flex justify-content-center mt-5 pt-5'>
      <div className='p-5 text-center'>
        <img style={{ width: '30vw' }} src={productImage} alt='productImage' />
      </div>
      <div className='vr'></div>
      <div className='p-5 d-flex flex-column'>
        <h2 className='text-capitalize fw-bold'>{name}</h2>
        {featured ? (
          <h6 className='fw-bold text-warning bg-dark p-2 w-25 text-center'>
            FEATURED
          </h6>
        ) : null}
        <RatingIcons userRating={productRating} />
        <h4 className='mt-2 mb-2 fs-3'>${price}</h4>
        <p className='m-1 mt-4 fs-5'>
          Size: {currentSize && currentSize.toUpperCase()}
        </p>
        <div className='list-group list-group-horizontal w-50'>
          {renderButtonSize('s')}
          {renderButtonSize('m')}
          {renderButtonSize('l')}
          {renderButtonSize('xl')}
        </div>
        <button
          className='btn btn-primary ps-4 pe-4 mt-4 mb-4 w-50'
          onClick={addToCart}
        >
          Add To Cart
        </button>
        <p className='mb-1 fw-bold'>Description: </p>
        <h3 className='fs-5'>{description}</h3>
        {true ? (
          renderLeaveReview()
        ) : (
          <h4 className='mt-3'>Sign in to leave a review.</h4>
        )}
      </div>
    </section>
  );
};

export default Product;
