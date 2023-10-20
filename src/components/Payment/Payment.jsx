import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import CartItem from '../CartItem/CartItem.jsx';
import { countOccurrences, addToCartSet } from '../../utils/index.js';
import {
  createPaymentIntent,
  updatePaymentIntent,
} from '../../utils/payment.utils.js';

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotalAmount, setCartTotalAmount] = useState(null);
  const [intentID, setIntentID] = useState(null);

  let cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const currentUser = useSelector((store) => store.USER.currentUser);
  if (currentUser) {
    cartItemsList = currentUser.cart;
  }

  useEffect(() => {
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY));
  }, []);

  useEffect(() => {
    if (cartItemsList.length > 0) {
      createPaymentIntent({
        cartItemsList,
      }).then((result) => {
        const { clientSecret, cartTotal, intentId } = result;
        const floatAmount = parseFloat((cartTotal / 100).toFixed(2));

        setIntentID(intentId);
        setCartTotalAmount(floatAmount);
        setClientSecret(clientSecret);
      });
    }
  }, []);

  useEffect(() => {
    if (intentID && clientSecret && cartItemsList.length > 0) {
      updatePaymentIntent({
        cartItemsList,
        intentId: intentID,
      }).then((result) => {
        const { cartTotal, clientSecret } = result;
        const floatAmount = parseFloat((cartTotal / 100).toFixed(2));

        setClientSecret(clientSecret);
        setCartTotalAmount(floatAmount);
      });
    }
  }, [cartItemsList, clientSecret, intentID]);

  useEffect(() => {}, [cartItemsList]);

  const renderCartItems = () => {
    return addToCartSet(cartItemsList).map((item, i) => {
      const itemCount = countOccurrences(cartItemsList, item.docID, item.size);
      return (
        <div key={i}>
          <CartItem product={{ ...item, count: itemCount }} />
        </div>
      );
    });
  };

  const loader = 'auto';

  return (
    <section
      className='container d-flex justify-content-center'
      style={{ paddingTop: '200px', paddingBottom: '280px', minHeight: '100vh' }}
    >
      <div className='p-5'>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret, loader }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <div className='vr'></div>
      <div className='p-5 d-flex flex-column'>
        <div className='flex-fill '>
          <h3 className='fw-bold'>Cart</h3>
          <div
            className='cart-items-container'
            style={{ maxHeight: '580px', overflowY: 'auto' }}
          >
            {cartItemsList && renderCartItems()}
          </div>
        </div>

        <h3 className='pt-3'>
          Total: $
          {cartTotalAmount && cartItemsList.length !== 0 && cartTotalAmount}
        </h3>
      </div>
    </section>
  );
}

export default Payment;
