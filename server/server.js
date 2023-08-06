const express = require('express');
const app = express();
const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });
const { getAllProducts } = require('./firebase.utils');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

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

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: 10000,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
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
