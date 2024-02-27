module.exports = (req, res, next) => {
  const sales = req.body;

  for (let index = 0; index < sales.length; index += 1) {
    const sale = sales[index];
    if (sale.quantity === undefined) {
      return res.status(400)
        .json({ message: '"quantity" is required' }); 
    }

    if (sale.quantity <= 0) {
      return res.status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' }); 
    }
  }

  next();
};