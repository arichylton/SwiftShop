import Stripe from 'stripe';

const stripe = Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

export const config = () => {
  return {
    publishableKey: import.meta.env.STRIPE_PUBLISHABLE_KEY,
  };
};

const calculateCartTotal = (cart) => {
  let currentCartTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    currentCartTotal += cart[i].price;
  }

  return parseInt(currentCartTotal.toFixed(2).toString().replace('.', ''));
};

export const updatePaymentIntent = async ({ cartItemsList, intentId }) => {
  try {
    const cartTotal = calculateCartTotal(cartItemsList);

    const paymentIntent = await stripe.paymentIntents.update(intentId, {
      amount: cartTotal,
      description: 'This is a test description',
    });

    return {
      clientSecret: paymentIntent.client_secret,
      cartTotal,
    };
  } catch (err) {
    return {
      error: {
        message: err.message,
      },
    };
  }
};

export const createPaymentIntent = async ({ cartItemsList }) => {
  let cartTotal = calculateCartTotal(cartItemsList);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: cartTotal,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    paymentIntent.amount = cartTotal;
    return {
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      intentId: paymentIntent.id,
    };
  } catch (err) {
    return {
      error: {
        message: err.message,
      },
    };
  }
};
