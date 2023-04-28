const { productsModel } = require('../models');

const findAll = async () => {
  const allProducts = await productsModel.findAll();

  return {
    type: null,
    message: allProducts,
  };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};
