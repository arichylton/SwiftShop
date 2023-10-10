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
import { formatDateToMonthDDYYYY, getAverageRating } from '../../utils';

const defaultFormFields = {
  title: '',
  rating: 3,
  reviewDescription: '',
  dateReviewed: new Date(),
};

const Product = () => {
  const location = useLocation();
  const [currentSize, setCurrentSize] = useState();
  const [updatedProductData, setUpdatedProductData] = useState(location.state);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, rating, reviewDescription } = formFields;
  const [productRating, setProductRating] = useState(0);
  const [doesUserReviewExist, setDoesUserReviewExist] = useState(false);
  const currentUser = useSelector((store) => store.USER.currentUser);
  let {
    name,
    productImage,
    price,
    sizes,
    description,
    featured,
    userRatings,
    docID,
  } = updatedProductData;

  useEffect(() => {
    if (updatedProductData.userRatings.length > 0) {
      if (currentUser) {
        if (updatedProductData.userRatings[i].userEmail === currentUser.email) {
          setDoesUserReviewExist(true);
        }
      }
      setProductRating(getAverageRating(updatedProductData));
    }
  }, [updatedProductData, currentUser]);

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
    // Update the userRatings in the state variable
    const updatedUserRatings = [...userRatings, formFields];
    const newProductData = {
      ...updatedProductData,
      userRatings: updatedUserRatings,
    };

    // Update the product data in the state variable
    setUpdatedProductData(newProductData);

    // Update the product data in the database (if needed)
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
              <div className='group mt-3 mb-4'>
                <input
                  className='form-input-review'
                  label='Title'
                  type='text'
                  required
                  onChange={handleChange}
                  name='title'
                  value={title}
                />
                <label className={`${title ? 'shrink' : ''} form-input-label`}>
                  {'Title'}
                </label>
              </div>
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

  const renderReview = () => {
    if (currentUser) {
      if (!doesUserReviewExist) {
        return renderLeaveReview();
      }
    } else {
      return <h4 className='mt-3'>Sign in to leave a review.</h4>;
    }
  };

  const renderProductReviews = () => {
    if (updatedProductData.userRatings.length > 0) {
      return updatedProductData.userRatings.map((review, index) => {
        return (
          <div
            key={index}
            className='pb-0'
            style={{
              paddingTop: '24px',
              marginTop: '24px',
              borderTop: 'solid 1px #ECECEC',
            }}
          >
            <h5 className='d-flex' style={{ marginBottom: '.5em' }}>
              {<RatingIcons userRating={review.rating} />}
            </h5>
            <h5 className=''>{review.title}</h5>
            <div>
              <h5 className=''>User: {review.displayName}</h5>
              <h5 className=''>
                {formatDateToMonthDDYYYY(review.dateReviewed)}
              </h5>

              <p className='card-text'>{review.reviewDescription}</p>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <section className='container d-flex flex-column justify-content-center mt-5 pt-5'>
      <div className='d-flex'>
        <div className='p-5 text-center'>
          <img
            style={{ width: '30vw' }}
            src={updatedProductData.productImage}
            alt='productImage'
          />
        </div>
        <div className='vr'></div>
        <div className='p-5 d-flex flex-column'>
          <h2 className='text-capitalize fw-bold'>{name}</h2>
          {featured ? (
            <h6 className='fw-bold text-warning bg-dark p-2 w-25 text-center'>
              FEATURED
            </h6>
          ) : null}
          <div className='d-flex align-items-center'>
            <RatingIcons userRating={productRating} size={'fs-5'} />
            <span className='f2-4 fw-bold ms-1'>{`(${updatedProductData.userRatings.length})`}</span>
          </div>
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
          <h3 className='fs-5' style={{ minWidth: '33vw' }}>
            {description}
          </h3>
          {renderReview()}
        </div>
      </div>
      <div
        style={{
          border: 'solid .1rem #ECECEC',
          borderRadius: 1,
          padding: '24px',
          margin: '100px 0',
        }}
      >
        <div style={{  }}>
          <h4 style={{ fontFamily: 'merriweather' }} className='mb-3'>
            Customer Reviews
          </h4>
          <div className='text-white fs-4'>
            ⭐⭐⭐⭐⭐ Over 1000+ 5 star reviews
          </div>
          <div className='fs-4'>Based on 1 Review</div>
          <div className='fs-5 text-decoration-underline text-end'>
            Leave Review
          </div>
        </div>

        {renderProductReviews()}
      </div>
    </section>
  );
};

export default Product;
