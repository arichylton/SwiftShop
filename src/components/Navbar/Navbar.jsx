// import { s } from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import cartImg from '../../assets/images/components/cart-shopping-solid.svg';
import { Cart } from '../Cart/Cart.jsx';
import { CartUser } from '../Cart_User/CartUser.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateURL } from '../../store/currentURL/currentURLSlice';
import './style.module.scss';
import logo from '../../assets/images/logos/logo.png'
import { signOutUser } from '../../utils/firebase.utils';
import { setCurrentUser } from '../../store/user/userSlice';
import { calculateCartTotal } from '../../utils/payment.utils';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const currentUser = useSelector((store) => store.USER.currentUser);
  const dispatch = useDispatch();

  const signOutHandler = async () => {
    await signOutUser();
    dispatch(setCurrentUser(null));
  };

  const renderNumberOfItemsInCart = () => {
    if (currentUser && currentUser.cart.length > 0) {
      return (
        <span className='position-absolute translate-middle badge rounded-pill bg-danger'>
          {currentUser.cart.length}
        </span>
      );
    } else if (cartItemsList.length > 0) {
      return (
        <span className='position-absolute translate-middle badge rounded-pill bg-danger'>
          {cartItemsList.length}
        </span>
      );
    }
  };

  return (
    <nav
      className='navbar fixed-top bg-body-tertiary p-0'
      style={{ borderBottom: 'solid 1px #d9d9d9' }}
    >
      <div className='w-100'>
        <div style={{ backgroundColor: '#eeeeee', height: '35px' }}>
          <div className='container d-flex justify-content-between align-items-center h-100'>
            <div>$ USD &#183; EN</div>
            <div className=' fs-5'>We donate $1 from every purchase</div>
            <div>
              {currentUser ? (
                <div className='dropstart'>
                  <a
                    className='dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton1'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {currentUser.displayName}
                  </a>
                  <ul
                    className='dropdown-menu dropdown-menu-dark'
                    aria-labelledby='dropdownMenuButton1'
                  >
                    <li className='text-center fs-5 p-2'>
                      {currentUser.isAdmin ? (
                        <Link
                          className='dropdown-item text-primary fw-bold'
                          style={{ cursor: 'pointer' }}
                          to='/admin/products'
                        >
                          Admin
                        </Link>
                      ) : null}
                    </li>
                    <li className='p-2 text-center fs-5 '>
                      <a
                        className='dropdown-item text-danger fw-bold'
                        onClick={signOutHandler}
                        style={{ cursor: 'pointer' }}
                      >
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(updateURL(window.location.pathname));
                    navigate('/signin', { state: location.state });
                  }}
                >
                  Log in
                </a>
              )}
            </div>
          </div>
        </div>
        <div className='pb-1 pt-1 d-flex justify-content-between m-auto container'>
          <div className='d-flex align-items-center'>
            <Link className='navbar-brand' to='/'>
              <img src={logo} alt='Logo' height='45' />
            </Link>
            <Link className='fs-4 ms-4' to='/all'>
              <p className='fs-5'>All</p>
            </Link>
            <Link className='fs-4 ms-4' to='/themes'>
              <p className='fs-5'>Themes</p>
            </Link>
            <Link className='fs-4 ms-4' to='/seasonal'>
              <p className='fs-5'>Seasonal</p>
            </Link>
            <Link className='fs-4 ms-4' to='/mens'>
              <p className='fs-5'>Mens</p>
            </Link>

            <Link className='fs-4 ms-4' to='/womens'>
              <p className='fs-5'>Womens</p>
            </Link>
          </div>

          <div className='d-flex'>
            <div className='d-flex align-items-center'>
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
                {renderNumberOfItemsInCart()}
              </a>
            </div>
          </div>

          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='offcanvasRight'
            aria-labelledby='offcanvasRightLabel'
          >
            <div
              className='offcanvas-header'
              style={{ borderBottom: 'solid 1px #d9d9d9' }}
            >
              <div className='d-flex align-items-center'>
                <h4 id='offcanvasRightLabel' className='m-0'>
                  Cart -{' '}
                </h4>
                <h5 className='ms-1 fst-italic'>
                  ${(calculateCartTotal(cartItemsList) / 100).toFixed(2)}
                </h5>
              </div>

              <button
                type='button'
                className='btn-close text-reset'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            {currentUser ? <CartUser /> : <Cart />}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
