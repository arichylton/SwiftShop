import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const cartTotal = useSelector((store) => store.CART.cartTotal);

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-between'
      style={{ height: '100%' }}
    >
      <div>
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <div className='d-flex flex-column'>
          {Object.keys(cartItemsList).map((key, i) => {
            return (
              <div key={i}>
                <CartItem product={cartItemsList[key]} />
              </div>
            );
          })}
        </div>
      </div>
      <Link to='/payment'>
        <button
          className='btn btn-primary mb-4 ps-4 pe-4'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasRight'
          aria-controls='offcanvasRight'
          to='/payment'
        >
          Checkout
        </button>
      </Link>
    </div>
  );
};
export default Cart;
