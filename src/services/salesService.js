const { salesModel, productsModel } = require('../models');
const { validateId } = require('./validations/validateId');

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
      type: 'PRODUCT_NOT_FOUND',
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

const findAllSales = async () => {
  const result = await salesModel.findAllSales();

  return {
    type: null,
    message: result,
  };
};

const findSalesById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await salesModel.findSalesById(id);

  if (result.length === 0) {
  return {
    type: 'SALE_NOT_FOUND',
    message: 'Sale not found',
  }; 
}

  return { type: null, message: result };
};

module.exports = {
  insertSale,
  findAllSales,
  findSalesById,
};
