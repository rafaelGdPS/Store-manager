const { salesService } = require('../services');
const trnaslateStatus = require('../utils/statusCode');

const getSales = async (__req, res) => {
  const { status, data } = await salesService.allSales();
  return res.status(trnaslateStatus(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await salesService.salesById(id);
  return res.status(trnaslateStatus(status)).json(data);
};

module.exports = {
  getSales,
  getSalesById,
};