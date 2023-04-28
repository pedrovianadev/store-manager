const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');

  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};
