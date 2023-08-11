const express = require('express');
const app = express();
const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });
const { getAllProducts } = require('./firebase.utils');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

const calculateCartTotal = (cart) => {
  let currentCartTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    currentCartTotal += cart[i].price;
  }

  return parseInt(currentCartTotal.toFixed(2).toString().replace('.', ''));
};

app.use(express.static(process.env.STATIC_DIR));
app.use(express.json());

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.get('/products-data', async (req, res) => {
  const productsDataInfo = await getAllProducts();

  res.send({ productsDataInfo });
});

app.post('/update-payment-intent', async (req, res) => {
  try {
    const cartItemsList = req.body.cartItemsList;
    const intentId = req.body.intentId;
    const cartTotal = calculateCartTotal(cartItemsList);

    const paymentIntent = await stripe.paymentIntents.update(intentId, {
      amount: cartTotal,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  let cartTotal = calculateCartTotal(req.body.cartItemsList);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: cartTotal,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    paymentIntent.amount = cartTotal;
    res.send({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      intentId: paymentIntent.id,
    });
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
