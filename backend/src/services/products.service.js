const { productModel } = require('../models');

const requestProducts = async (id) => {
  const product = await productModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

const insertProduct = async (productName) => {
  const product = await productModel.insert(productName);
  return { status: 'CREATED', data: product };
};

module.exports = {
  requestProducts,
  insertProduct,
};