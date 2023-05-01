const camelize = require('camelize');
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

const findAllSales = async () => {
  const query = `SELECT (sP.sale_id), (s.date), (sP.product_id), (sP.quantity) 
  FROM StoreManager.sales_products AS sP
  INNER JOIN StoreManager.sales AS s
  ON s.id = sP.sale_id`;

  const [result] = await connection.execute(query);

  return camelize(result);
};

const findSalesById = async (id) => {
  const query = `SELECT (s.date), (sP.product_id), (sP.quantity)
  FROM StoreManager.sales_products AS sP
  INNER JOIN StoreManager.sales AS s
  ON s.id = sP.sale_id
  WHERE sale_id = ?`;

  const [result] = await connection.execute(query, [id]);

  return camelize(result);
};

module.exports = {
  insertSale,
  findAllSales,
  findSalesById,
};