module.exports = async (req, res, next) => {
  const sales = req.body;
  
  for (let i = 0; i < sales.length; i += 1) {
    const sale = sales[i];
    
    if (!sale.productId) {
      return res.status(400)
        .json({ message: '"productId" is required' }); 
    }
  }
  
  next();
};