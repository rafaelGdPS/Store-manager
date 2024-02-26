const { findAll } = require('../models/products');
const { productsService } = require('../services');
const trnaslateStatus = require('../utils/statusCode');

const getProducts = async (_req, res) => {
  const allProducts = await findAll();
  return res.status(200).json(allProducts);
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.requestProducts(id);
  return res.status(trnaslateStatus(status)).json(data);
};
const postProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.insertProduct(name);
  return res.status(trnaslateStatus(status)).json(data);
};
module.exports = { 
  getProducts,
  getProductById,
  postProduct,
};