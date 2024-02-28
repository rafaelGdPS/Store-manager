const express = require('express');
const { salesController, productsController } = require('./controllers');
const { validateName, validateProductId, validateQuantity } = require('./middlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductById);
app.put('/products/:id', validateName, productsController.putProducts);
app.post('/products', validateName, productsController.postProduct);
app.delete('/products/:id', productsController.removeProducts);

app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);
app.post('/sales', validateProductId, validateQuantity, salesController.postSales);

module.exports = app;
