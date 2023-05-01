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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.insertProduct(name);
  return res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProductById(name, id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  productsList,
  getByID,
  insertProduct,
  updateProductById,
};
