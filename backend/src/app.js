const express = require('express');
const { salesController, productsController } = require('./controllers');
const { postProduct } = require('./controllers/products');
const validateName = require('./middlewares/validateName');
const validateProductId = require('./middlewares/validateProductId,');
const validateQuantity = require('./middlewares/validateQuantity');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductById);
app.put('/products/:id', validateName, productsController.putProducts);
app.post('/products', validateName, postProduct);

app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);
app.post('/sales', validateProductId, validateQuantity, salesController.postSales);

module.exports = app;
