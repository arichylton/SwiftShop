// import { s } from './style.module.css';
import { useSelector } from 'react-redux';
import cartImg from '../../assets/images/components/cart-shopping-solid.svg';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const [userData, setUserData] = useState(null);

  const loginWithGoogle = () => {
    fetch('/googleSignIn')
      .then(async (result) => {
        console.log('Response:', result); // Log the response
        const data = result.body;
        setUserData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <nav className='navbar bg-body-tertiary'>
      <div className='container-fluid m-2 ps-4 pe-4'>
        <Link className='navbar-brand' to='/'>
          <img
            src='../../../src/assets/images/logos/logo.png'
            alt='Logo'
            height='50'
          />
        </Link>
        <div className='d-flex p-2'>
          <div className='d-flex pe-5'>
            <a
              style={{ cursor: 'pointer' }}
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasRight'
              aria-controls='offcanvasRight'
              role='button'
            >
              <img
                src={cartImg}
                alt='cartImg'
                style={{ width: 35 }}
                className='position-relative'
              />

              {cartItemsList.length != 0 && (
                <span className='position-absolute translate-middle badge rounded-pill bg-danger'>
                  {cartItemsList.length}
                </span>
              )}
            </a>
          </div>
          <Link className='navbar-brand' to='/signin'>
            <h5>Sign In</h5>
          </Link>
        </div>

        <div
          className='offcanvas offcanvas-end'
          tabIndex='-1'
          id='offcanvasRight'
          aria-labelledby='offcanvasRightLabel'
        >
          <div className='offcanvas-header'>
            <h5 id='offcanvasRightLabel'>Cart</h5>
            <button
              type='button'
              className='btn-close text-reset'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>
          <Cart />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
