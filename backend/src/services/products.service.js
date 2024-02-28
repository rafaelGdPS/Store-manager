const { productModel } = require('../models');

const requestAllProducts = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const requestProducts = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

const insertProduct = async (productName) => {
  const product = await productModel.insert(productName);
  return { status: 'CREATED', data: product };
};

const updateProduct = async (id, newProduct) => {
  const productById = await productModel.findById(id);

  if (!productById) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const product = await productModel.update(id, newProduct);
  console.log(product);
  return { status: 'SUCCESSFUL', data: product };
};

const deleProduct = async (id) => {
  const validateProduct = await productModel.findById(id);

  if (!validateProduct) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await productModel.remove(id);
  return { status: 'DELETED' };
};

module.exports = {
  requestAllProducts,
  requestProducts,
  insertProduct,
  updateProduct,
  deleProduct,
};