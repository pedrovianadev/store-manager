const { salesModel, productsModel } = require('../models');

const findIdSales = async (salesArray) => {
  const products = await Promise.all(
    salesArray.map(async ({ productId }) => {
      const product = await productsModel.findById(productId);

      if (!product) return false;
      return true;
    }),
  );

  if (products.some((e) => e === false)) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  return ({ products });
};

const insertSale = async (salesArray) => {
  const error = await findIdSales(salesArray);
  if (error.type) return error;
  const result = await salesModel.insertSale(salesArray);

  return {
    type: null,
    message: result,
  };
};

module.exports = {
  insertSale,
};
