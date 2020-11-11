const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HmDCKH3d2mWalGhr2rRIDwDfwtaHbyBnB40FAe8twHoBGVSOTZRPNUh9jnBbBdP3oSgLTiV7TvaODHhQvQGWMsy00QiiZLDL6");
app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post("/great", async (req, res) => {
    res.send("Hello Word");
});

app.listen(3000, () => console.log('Node server listening on port 3000!'));