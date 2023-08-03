// import { s } from './style.module.css';
import cartImg from '../../assets/images/components/cart-shopping-solid.svg';
import Cart from '../Cart/Cart';

const Navbar = () => {
  return (
    <nav className='navbar bg-body-tertiary'>
      <div className='container-fluid m-2 ps-4 pe-4'>
        <a className='navbar-brand' href='#'>
          <img
            src='../../../src/assets/images/logos/logo.png'
            alt='Logo'
            height='50'
          />
        </a>
        <a
          style={{ cursor: 'pointer' }}
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasRight'
          aria-controls='offcanvasRight'
          role='button'
        >
          <img src={cartImg} style={{ height: 30 }} />
        </a>

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
