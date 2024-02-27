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

const updateProduct = async (id, newProduct) => {
  const productById = await productModel.findById(id);

  if (!productById) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const product = await productModel.update(id, newProduct);
  console.log(product);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  requestProducts,
  insertProduct,
  updateProduct,
};