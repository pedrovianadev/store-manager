const { salesService } = require('../services');

const insertSales = async (req, res) => {
  const { type, message } = await salesService.insertSale(req.body);
  if (type) return res.status(404).json({ message });
  
  return res.status(201).json(message);
};

const allSales = async (req, res) => {
  const { message } = await salesService.findAllSales();

  return res.status(200).json(message);
};

const salesById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.findSalesById(id);

  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  allSales,
  salesById,
};
