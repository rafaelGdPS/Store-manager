const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`SELECT
    sp.sale_id AS 'saleId',
    sl.date, 
    sp.product_id AS 'productId',
    sp.quantity
  FROM sales AS sl
  INNER JOIN  sales_products AS sp
    ON sl.id = sp.sale_id
  ORDER BY saleId, productId`);
  return sales;
};

const findById = async (id) => {
  const [sales] = await connection.execute(`SELECT
  date,
  product_id AS 'productId',
  quantity
  FROM sales
  INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
  WHERE id = ?`, [id]);
  console.log(sales);
  return sales;
};

const insert = async (sales) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales(date) VALUES(default)');
  console.log(insertId);
  sales.map(async (sale) => {
    const query = 'INSERT INTO sales_products (product_id, sale_id, quantity) VALUES(?, ?, ?)';
    await connection.execute(query, [sale.productId, insertId, sale.quantity]);
  });
  return { id: insertId, itemsSold: sales };
};

module.exports = {
  findAll,
  findById,
  insert,
};