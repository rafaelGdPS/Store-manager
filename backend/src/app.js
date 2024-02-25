const express = require('express');
const { getProducts, getProductById } = require('./controllers/products');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', getProducts);
app.get('/products/:id', getProductById);

module.exports = app;
