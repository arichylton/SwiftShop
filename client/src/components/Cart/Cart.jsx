import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';
import { countOccurrences, addToCartSet } from '../../utils';
import Button from '../button/button';

export const Cart = () => {
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-between'
      style={{ height: '100%' }}
    >
      <div>
        {(cartItemsList && (
          <div className='d-flex flex-column'>
            {addToCartSet(cartItemsList).map((item, i) => {
              const itemCount = countOccurrences(
                cartItemsList,
                item.docID,
                item.size
              );
              return (
                <div key={i}>
                  <CartItem product={{ ...item, count: itemCount }} />
                </div>
              );
            })}
          </div>
        )) || <div>Nothing in your cart yet!</div>}
      </div>
      {(cartItemsList.length > 0 && (
        <Link to='/payment' className='mb-4'>
          <Button
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasRight'
            aria-controls='offcanvasRight'
            to='/payment'
          >
            Checkout
          </Button>
        </Link>
      )) || (
        <div className='mb-4'>
          <Button
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasRight'
            aria-controls='offcanvasRight'
          >
            Nothing in your cart yet!
          </Button>
        </div>
      )}
    </div>
  );
};
