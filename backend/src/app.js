const express = require('express');
const { salesController, productsController } = require('./controllers');
const { postProduct } = require('./controllers/products');
const validateName = require('./middlewares/validateName');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductById);
app.post('/products', validateName, postProduct);

app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);
app.post('/sales', salesController.postSales);

module.exports = app;
