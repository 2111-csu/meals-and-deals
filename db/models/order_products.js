const client = require("../client");

const createOrderProduct = async ({ productId, orderId, price, quantity }) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
      INSERT INTO order_products("productId", "orderId", price, quantity) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [productId, orderId, price, quantity]
    );
    return orderProduct;
  } catch (error) {
    throw error;
  }
};

async function getOrderProductById(id) {

  try {
    const { rows: [orderProduct] } = await client.query(`
          SELECT *
          FROM order_products
          WHERE id = $1
          `, [id]);

    return orderProduct;
  } catch (error) {
    throw error;
  };
};

async function addProductToOrder({ orderId, productId, price, quantity }) {

  try {
    const { rows: [orderProduct] } = await client.query(`
          INSERT INTO order_products("orderId", "productId", price, quantity)
          VALUES($1, $2, $3, $4)
          RETURNING *;
          `, [orderId, productId, price, quantity]);

    return orderProduct;
  } catch (error) {
    throw error;
  };
};

async function updateOrderProduct({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}" =$${index + 1}`
  ).join(', ');

  try {
    const { rows: [orderProduct] } = await client.query(`
      UPDATE order_products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `, Object.values(fields));

    return orderProduct;
  } catch (error) {
    throw error;
  };
};

async function destroyOrderProduct(id) {
  try {
    const { rows: [orderProduct] } = await client.query(`
      DELETE 
      FROM order_products
      WHERE id = $1
      RETURNING *;
      `, [id]);

    return orderProduct;
  } catch (error) {
    throw error;
  };
};

module.exports = {
  createOrderProduct,
  getOrderProductById,
  addProductToOrder,
  destroyOrderProduct,
  updateOrderProduct
};
