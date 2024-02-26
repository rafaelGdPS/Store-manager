const { salesModels } = require('../models');

const allSales = async () => {
  const dataSales = await salesModels.findAll();
  return { status: 'SUCCESSFUL', data: dataSales };
};

const salesById = async (id) => {
  const product = await salesModels.findById(id);
  if (product.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  salesById,
  allSales,
};