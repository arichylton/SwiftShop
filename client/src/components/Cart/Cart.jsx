import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';

const Cart = () => {
  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const cartTotal = useSelector((store) => store.CART.cartTotal);

  return (
    <div className='d-flex flex-column align-items-center'>
      <h3>Total: ${cartTotal.toFixed(2)}</h3>
      <div className='d-flex flex-column'>
        {cartItemsList.map((cartItem, i) => {
          return (
            <div key={i}>
              <CartItem product={cartItem} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Cart;

