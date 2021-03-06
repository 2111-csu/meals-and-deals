const client = require("../client");
const { attachProductsToOrders } = require("./products");

const createOrders = async ({ status, userId, datePlaced }) => {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
      INSERT INTO orders(status, "userId", "datePlaced") 
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [status, userId, datePlaced]
    );
    return orders;
  } catch (error) {
    throw error;
  };
};

const getOrderById = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    SELECT * 
    FROM orders
    WHERE id = $1
    `,
      [id]
    );
    return attachProductsToOrders([order]);
  } catch (error) {
    throw error;
  };
};

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "creatorName"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    `);
    return attachProductsToOrders(orders);
  } catch (error) {
    throw error;
  };
};

async function getOrdersByUser({ id }) {
  try {
    const user = await getUserById(id);
    const { rows: orders } = await client.query(
      `
    SELECT orders.*, users.username AS "creatorName"
    FROM orders
    JOIN users ON orders."userId" = users.id 
    WHERE "userId" = $1
    `,
      [user.id]
    );
    return attachProductsToOrders(orders);
  } catch (error) {
    throw error;
  };
};

async function getCartByUser(userId) {
  try {
    const { rows: [order] } = await client.query(`
    SELECT orders.*, users.username AS "creatorName"
    FROM orders
    JOIN users ON orders."userId" = users.id
    WHERE "userId" = $1
    AND orders.status = 'created'
    `, [userId]);
    return attachProductsToOrders([order]);
  } catch (error) {
    throw error;
  };
};

async function getOrderHistory(userId) {
  try {
    const { rows: orders } = await client.query(`
    SELECT orders.*, users.username AS "creatorName"
    FROM orders
    JOIN users ON orders."userId" = users.id
    WHERE "userId" = $1
    AND orders.status = 'completed'
    `, [userId]);
    console.log('orderhistoyr', orders)
    return attachProductsToOrders(orders);
  } catch (error) {
    throw error;
  };
};

async function getOrdersByProduct({ id }) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT orders.*, users.username AS "creatorName"
      FROM orders
      JOIN users ON orders."userId" = users.id
      JOIN order_products ON order_products."orderId" = orders.id
      WHERE order_products."productId" = $1;
    `,
      [id]
    );
    return attachProductsToOrders(orders);
  } catch (error) {
    throw error;
  };
};

const createOrder = async ({ status, userId }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders(status, "userId") 
      VALUES ($1, $2)
      RETURNING *
    `,
      [status, userId]
    );
    return order;
  } catch (error) {
    throw error;
  };
};

async function updateOrder({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" =$${index + 1}`)
    .join(", ");

  try {
    const {
      rows: [order],
    } = await client.query(
      `
    UPDATE orders
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
      Object.values(fields)
    );

    return order;
  } catch (error) {
    throw error;
  };
};

async function completeOrder(id) {
  try {
    const { rows: [order] } = await client.query(`
        UPDATE orders
        SET status = 'completed'
        WHERE id = $1
        RETURNING *;
        `, [id])
    return order
  } catch (error) {
    throw error;
  };
};

async function cancelOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      UPDATE orders
      SET status = 'canceled'
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  };
};

module.exports = {
  createOrders,
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  updateOrder,
  completeOrder,
  cancelOrder,
  getOrderHistory,
};
