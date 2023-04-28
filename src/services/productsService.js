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

const insertProduct = async (product) => {
  const insertId = await productsModel.insertProduct(product);
  const newProduct = await productsModel.findById(insertId);
  return {
    type: null,
    message: newProduct,
  };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};
