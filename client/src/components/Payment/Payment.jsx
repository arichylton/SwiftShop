import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import CartItem from '../CartItem/CartItem.jsx';
import { countOccurrences, addToCartSet } from '../../utils/index.js';

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotalAmount, setCartTotalAmount] = useState(null);
  const [intentID, setIntentID] = useState(null);

  const cartItemsList = useSelector((store) => store.CART.cartItemsList);

  useEffect(() => {
    fetch('/config').then(async (result) => {
      const { publishableKey } = await result.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (cartItemsList.length > 0) {
      fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemsList }),
      }).then(async (result) => {
        const { clientSecret, cartTotal, intentId } = await result.json();
        const floatAmount = parseFloat((cartTotal / 100).toFixed(2));

        setIntentID(intentId);
        setCartTotalAmount(floatAmount);
        setClientSecret(clientSecret);
      });
    }
  }, []);

  useEffect(() => {
    if (intentID && clientSecret && cartItemsList.length > 0) {
      fetch('/update-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItemsList,
          intentId: intentID,
        }),
      }).then(async (result) => {
        const { cartTotal, clientSecret } = await result.json();
        const floatAmount = parseFloat((cartTotal / 100).toFixed(2));

        setClientSecret(clientSecret);
        setCartTotalAmount(floatAmount);
      });
    }
  }, [cartItemsList, clientSecret, intentID]);

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
    <section className='container d-flex justify-content-center  mt-4'>
      <div className='p-5'>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret, loader }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <div className='vr'></div>
      <div className='p-5 d-flex flex-column'>
        <div className='flex-fill'>
          <h3 className='fw-bold'>Cart</h3>
          {cartItemsList && renderCartItems()}
        </div>

        <h3 className='pt-3'>
          Total: $
          {cartTotalAmount && cartItemsList.length != 0 && cartTotalAmount}
        </h3>
      </div>
    </section>
  );
}

export default Payment;
