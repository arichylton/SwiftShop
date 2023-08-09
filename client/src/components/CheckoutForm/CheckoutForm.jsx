import { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment status: ' + paymentIntent.status + '🎉');
    } else {
      setMessage('Unexpected state');
    }

    setIsProcessing(false);
  };

  return (
    <>
      <h2 className=''>Contact info</h2>
      <form className='mt-3 mb-3'>
        <LinkAuthenticationElement />
      </form>
      <h2>Shipping</h2>
      <form className='mt-3 mb-3'>
        <AddressElement options={{ mode: 'shipping' }} />
      </form>
      <h2>Payment</h2>
      <form id='payment-form' onSubmit={handleSubmit} className='mt-3'>
        <PaymentElement />
        <button
          disabled={isProcessing}
          id='submit'
          className='btn btn-primary mt-3'
        >
          <span id='button-text'>
            {isProcessing ? 'Processing ... ' : 'Pay now'}
          </span>
        </button>

        {/* Show any error or success messages */}
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </>
  );
}
