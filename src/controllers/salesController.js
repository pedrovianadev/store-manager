const { salesService } = require('../services');

const insertSales = async (req, res) => {
  const { type, message } = await salesService.insertSale(req.body);
  if (type) return res.status(404).json({ message });
  
  return res.status(201).json(message);
};

module.exports = {
  insertSales,
};
