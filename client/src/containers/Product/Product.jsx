import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../store/cartItems/cartItemsSlice';
import { addUserCartItem } from '../../store/user/userSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RatingIcons from '../../components/RatingIcons/RatingIcons';
import { Rating } from 'semantic-ui-react';
import { updateProduct, updateUserCart } from '../../utils/firebase.utils';
import Button from '../../components/button/button';
import starSolid from '../../assets/images/components/star-solid.svg';

import {
  formatDateToMonthDDYYYY,
  getAverageRating,
  isProductNew,
} from '../../utils';
import ProductPageItem from '../ProductPageItem/ProductPageItem';

const defaultFormFields = {
  title: '',
  rating: 3,
  reviewDescription: '',
  dateReviewed: new Date(),
};

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentSize, setCurrentSize] = useState();
  const [updatedProductData, setUpdatedProductData] = useState(location.state);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, rating, reviewDescription } = formFields;
  const [productRating, setProductRating] = useState(0);
  const [doesUserReviewExist, setDoesUserReviewExist] = useState(false);
  const currentUser = useSelector((store) => store.USER.currentUser);
  const [productsData, setProductsData] = useState(null);

  let {
    name,
    productImage,
    price,
    sizes,
    description,
    featured,
    userRatings,
    docID,
    season,
    theme,
  } = updatedProductData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch('/products-data').then(async (result) => {
      const { productsDataInfo } = await result.json();
      setProductsData(productsDataInfo);
    });
  }, []);

  const renderSimilarProducts = () => {
    if (productsData) {
      return productsData
        .filter((product) => {
          return (
            product.name != name &&
            (product.season == season || product.theme == theme)
          );
        })
        .map((product, index) => {
          if (index > 3) {
            return;
          }
          return (
            <Link
              key={index}
              to={`/product/${product.docID}`}
              onClick={() =>
                navigate(`/product/${product.docID}`, {
                  state: product,
                  replace: true,
                })
              }
            >
              <ProductPageItem product={product} />
            </Link>
          );
        });
    } else {
      return <div>No Product Information Yet</div>;
    }
  };

  useEffect(() => {
    if (userRatings.length > 0) {
      if (currentUser) {
        for (let i = 0; i < userRatings.length; i++) {
          if (userRatings[i].userEmail === currentUser.email) {
            setDoesUserReviewExist(true);
          }
        }
      }
      setProductRating(getAverageRating(updatedProductData));
    }
  }, []);

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
        style={{ borderRadius: '0' }}
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
            <div>
              <div className='fst-italic' style={{ fontSize: '16px' }}>
                {review.title}
              </div>
              <span className='fs-5 fw-bold'>{review.displayName}</span>
              <span> on </span>
              <span className='fs-5 fw-bold'>
                {formatDateToMonthDDYYYY(review.dateReviewed)}
              </span>
              <p className='card-text pt-3'>{review.reviewDescription}</p>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <section
      className='container d-flex flex-column justify-content-center'
      style={{ marginTop: '120px' }}
    >
      <div className='d-flex'>
        <div className='p-5 text-center'>
          <div className='image-container'>
            <img
              className='product__image'
              src={productImage}
              alt='productImage'
            />
            <div className='product__overlay'>
              <div className='p-2 d-flex'>
                {productRating ? (
                  <div
                    style={{ minWidth: '4rem', backgroundColor: '#eee' }}
                    className='product__text-bubble d-flex align-items-center justify-content-center'
                  >
                    <div className='text-dark pe-1'>
                      {productRating.toFixed(1)}
                    </div>
                    <img
                      src={starSolid}
                      style={{ width: 14, height: 14 }}
                      className='h-100'
                    />
                  </div>
                ) : null}
                {featured ? (
                  <div className='product__text-bubble'>Featured</div>
                ) : null}
                {isProductNew(updatedProductData) ? (
                  <div className='product__text-bubble'>New</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className='vr'></div>
        <div className='p-5 d-flex flex-column'>
          <h2 className='text-capitalize fst-italic me-2'>{name}</h2>

          <h4
            className='mt-2 mb-2 pb-4 fs-5'
            style={{ borderBottom: 'solid 1px #d9d9d9' }}
          >
            ${price}
          </h4>
          <p className='m-1 mt-4 fs-5'>
            Size: {currentSize && currentSize.toUpperCase()}
          </p>
          <div
            className='list-group list-group-horizontal w-50'
            style={{ borderRadius: '40' }}
          >
            {renderButtonSize('s')}
            {renderButtonSize('m')}
            {renderButtonSize('l')}
            {renderButtonSize('xl')}
          </div>
          <div className='mt-3 mb-5 w-100'>
            <Button onClick={addToCart} buttonType='google'>
              Add To Cart - ${price}
            </Button>
          </div>

          <p className='mb-1 fw-bold'>Description: </p>
          <h3 className='fs-5' style={{ minWidth: '33vw' }}>
            {description}
          </h3>
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
        <h4 style={{ fontFamily: 'merriweather' }} className='mb-3'>
          Customer Reviews
        </h4>
        {productRating ? <RatingIcons userRating={productRating} /> : null}
        <div className='fs-4'>
          Based on {updatedProductData.userRatings.length}{' '}
          {updatedProductData.userRatings.length == 1 ? 'Review' : 'Reviews'}
        </div>
        <div className='fs-5'>{renderReview()}</div>

        {renderProductReviews()}
      </div>

      <div style={{ paddingBottom: 100 }} className=' h-100'>
        <h4
          className='fw-bold fs-3 mb-4'
          style={{ fontFamily: 'merriweather' }}
        >
          Check these out
        </h4>
        <div className='grid grid-cols-4'>{renderSimilarProducts()}</div>
      </div>
    </section>
  );
};

export default Product;
