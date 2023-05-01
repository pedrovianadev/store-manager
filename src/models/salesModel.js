const connection = require('./connection');

const insertSale = async (salesArray) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUE (NOW())');

  const sales = await Promise.all(salesArray.map(async (element) => {
    const { productId, quantity } = element;

    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, productId, quantity],
    );
    return element;
  }));

  return { id: insertId, itemsSold: sales };
};

module.exports = {
  insertSale,
};