// import { s } from './style.module.css';
import { useSelector } from 'react-redux';
import cartImg from '../../assets/images/components/cart-shopping-solid.svg';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const currentUser = useSelector((store) => store.USER.currentUser);
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
          <div className='d-flex pe-5 align-items-center'>
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
          {currentUser ? (
            <a style={{ cursor: 'pointer' }}>
              <img
                src={currentUser.photoURL}
                alt='user_IMG'
                style={{ width: '40px', borderRadius: '50%' }}
              />
            </a>
          ) : (
            <Link className='navbar-brand' to='/signin'>
              Sign In
            </Link>
          )}
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
