const { productsService } = require('../services');

const productsList = async (req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) {
      return res.status(404).json(message);
  }
  return res.status(200).json(message);
};

const getByID = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.findById(id);

  if (type) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  productsList,
  getByID,
};