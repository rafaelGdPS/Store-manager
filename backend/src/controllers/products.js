const { productsService } = require('../services');
const trnaslateStatus = require('../utils/statusCode');

const getProducts = async (_req, res) => {
  const { status, data } = await productsService.requestAllProducts();
  return res.status(trnaslateStatus(status)).json(data);
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

const putProducts = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name } = req.body;
  const { data, status } = await productsService.updateProduct(Number(id), name);
  return res.status(trnaslateStatus(status)).json(data);
};
const removeProducts = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleProduct(id);
  return res.status(trnaslateStatus(status)).json(data);
};
module.exports = { 
  getProducts,
  getProductById,
  postProduct,
  putProducts,
  removeProducts,
};