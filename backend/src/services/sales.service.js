const { salesModels, productModel } = require('../models');

const allSales = async () => {
  const dataSales = await salesModels.findAll();
  return { status: 'SUCCESSFUL', data: dataSales };
};

const salesById = async (id) => {
  const product = await salesModels.findById(id);
  if (product.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: product };
};
const salesInsert = async (sales) => {
  const allProducts = await productModel.findAll();
  
  for (let i = 0; i < sales.length; i += 1) {
    const sale = sales[i];
    const products = allProducts.find((product) => product.id === sale.productId);
    console.log(products);
    if (!products) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
  }
  const salesData = await salesModels.insert(sales);
  return { status: 'CREATED', data: salesData };
};
module.exports = {
  salesById,
  allSales,
  salesInsert,
};