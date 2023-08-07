import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const cartTotal = useSelector((store) => store.CART.cartTotal);

  function countOccurrences(arr, element) {
    return arr.filter((item) => item === element).length;
  }

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-between'
      style={{ height: '100%' }}
    >
      <div>
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        {(cartItemsList && (
          <div className='d-flex flex-column'>
            {[...new Set(cartItemsList)].map((item, i) => {
              const itemCount = countOccurrences(cartItemsList, item);
              return (
                <div key={i}>
                  <CartItem product={{ ...item, count: itemCount }} />
                </div>
              );
            })}
          </div>
        )) || <div>Nothing in your cart yet!</div>}
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
