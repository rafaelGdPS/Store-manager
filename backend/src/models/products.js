const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');

  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products(name) VALUES(?)',
    [productName],
  );
  return { id: insertId, name: productName };
};

module.exports = {
  findAll,
  findById,
  insert,
};