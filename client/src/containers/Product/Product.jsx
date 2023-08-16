import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cartItems/cartItemsSlice';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import s from './style.module.css';

const Product = () => {
  const location = useLocation();
  const [currentSize, setCurrentSize] = useState();

  const { name, productImage, price, sizes } = location.state;

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
    dispatch(addCartItem({ ...location.state, size: currentSize }));
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
          <h2 className='text-capitalize'>{name}</h2>
          <h4 className='mt-2 mb-2'>${price}</h4>
          <div className='list-group list-group-horizontal'>
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
                sizes.m != 0 ? '' : `disabled text-danger  `
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
        </div>
        <button className='btn btn-primary ps-4 pe-4 ' onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </section>
  );
};

export default Product;
