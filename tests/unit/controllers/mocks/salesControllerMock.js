const salesSucess = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const salesError = {
  type: "PRODUCT_NOT_FOUND",
  message: "Product not found",
};

module.exports = {
  salesSucess,
  salesError,
};
