const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_KEY = 'nvv7vx06kzrguet0662azw';
const API_URL = 'https://api.finmo.net/v1/payin';

app.post('/payin', async (req, res) => {
  const payinDetails = {
    amount: req.body.amount,
    currency: req.body.currency,
    description: req.body.description,
    payin_method_name: req.body.payin_method_name,
    payin_method_param: req.body.payin_method_param,
    organization_reference_id: req.body.organization_reference_id,
    metadata: req.body.metadata
  };
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payinDetails)
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing payin');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
