import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm.jsx';
import { Elements } from '@stripe/react-stripe-js';
import CartItem from '../CartItem/CartItem.jsx';

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  const cartItemsList = useSelector((store) => store.CART.cartItemsList);
  const cartTotal = useSelector((store) => store.CART.cartTotal);

  const paymentAmount = 10000;

  useEffect(() => {
    fetch('/config').then(async (result) => {
      const { publishableKey } = await result.json();

      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentAmount: 10000 }),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  const renderCartItems = () => {
    return cartItemsList.map((cartItem, i) => {
      return (
        <div key={i}>
          <CartItem product={cartItem} />
        </div>
      );
    });
  };

  return (
    <section className='container d-flex justify-content-center align-items-center mt-4'>
      <div className='p-5'>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <div className='p-5'>
        <h2>Cart</h2>
        {renderCartItems()}
      </div>
    </section>
  );
}

export default Payment;
