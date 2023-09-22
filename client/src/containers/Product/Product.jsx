import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../store/cartItems/cartItemsSlice';
import { addUserCartItem } from '../../store/user/userSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RatingIcons from '../../components/RatingIcons/RatingIcons';
import { Rating } from 'semantic-ui-react';
import { updateProduct, updateUserCart } from '../../utils/firebase.utils';
import Button from '../../components/button/button';
import FormInput from '../../components/form-input/form-input';

const defaultFormFields = {
  title: '',
  rating: 3,
  reviewDescription: '',
};

const Product = () => {
  const location = useLocation();
  const [currentSize, setCurrentSize] = useState();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, rating, reviewDescription } = formFields;
  const [productRating, setProductRating] = useState(0);
  const currentUser = useSelector((store) => store.USER.currentUser);
  const {
    name,
    productImage,
    price,
    sizes,
    description,
    featured,
    userRatings,
    docID,
  } = location.state;

  useEffect(() => {
    console.log(userRatings)
    if (userRatings.length > 0) {
      let avgRating = 0;
      for (let i = 0; i < userRatings.length; i++) {
        avgRating += userRatings[i].rating;
      }
      avgRating = avgRating / userRatings.length;
      
      setProductRating(avgRating);
    }
  }, [userRatings]);

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

  useEffect(() => {
    if (currentUser) {
      setFormFields({
        ...formFields,
        userEmail: currentUser.email,
        displayName: currentUser.displayName,
      });
    }
  }, [currentUser]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

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

  const submitReviewForm = async () => {
    console.log(userRatings)
    const updatedUserRatings = [...userRatings, formFields];
    await updateProduct({ userRatings: updatedUserRatings }, docID);
  };

  const handleRate = (e, { rating }) =>
    setFormFields({ ...formFields, ['rating']: rating });

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
              <FormInput
                label='Title'
                type='text'
                required
                onChange={handleChange}
                name='title'
                value={title}
              />
              <div className='mb-3 d-flex align-items-center'>
                <label
                  htmlFor='exampleFormControlInput3'
                  className='form-label fs-5 me-2'
                >
                  Rating
                </label>
                <Rating
                  icon='star'
                  defaultRating={3}
                  maxRating={5}
                  onRate={handleRate}
                  className='fs-5'
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label fs-5'
                >
                  Description
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  name='reviewDescription'
                  value={reviewDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
              <Button
                onClick={submitReviewForm}
                data-bs-toggle='collapse'
                data-bs-target='#collapseOne'
              >
                Submit Review
              </Button>
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
