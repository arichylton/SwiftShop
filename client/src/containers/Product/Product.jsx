import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cartItems/cartItemsSlice';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Product = () => {
  const location = useLocation();

  console.log(location.state);
  const { name, productImage, price, size } = location.state;

  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();
    dispatch(addCartItem(location.state));
  };

  return (
    <section className='container d-flex justify-content-center mt-4'>
      <div className='p-5 text-center'>
        <img
          style={{ width: '240px' }}
          src={`/src/assets/images/products/${productImage}`}
          alt='productImage'
        />
      </div>
      <div className='p-5 d-flex flex-column'>
        <div className='flex-fill'>
          <h3 className='text-capitalize'>{name}</h3>
          <p className='fs-4 mt-2 mb-2'>${price}</p>
          <p className='fs-5 text-uppercase'>{size}</p>
        </div>
        <button className='btn btn-primary ps-4 pe-4 ' onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </section>
  );
};

export default Product;
