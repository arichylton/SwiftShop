import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';
import { countOccurrences, addToCartSet } from '../../utils';
import Button from '../button/button';
import { useEffect, useState } from 'react';

export const CartUser = () => {
  const currentUser = useSelector((store) => store.USER.currentUser);
  const [userCart, setUserCart] = useState(currentUser.cart)

  useEffect(() => {
    setUserCart(currentUser.cart);
  }, [currentUser.cart])
  return (
    <div
      className='d-flex flex-column align-items-center justify-content-between'
      style={{ height: '100%' }}
    >
      <div>
        {(userCart && (
          <div className='d-flex flex-column'>
            {addToCartSet(userCart).map((item, i) => {
              const itemCount = countOccurrences(
                userCart,
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
      {(userCart.length > 0 && (
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