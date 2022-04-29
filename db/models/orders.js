const client = require("../client");

//  getOrderById
// getOrderById(id)
const getOrderById = async (id) => {
  try {
    const { rows: order } = await client.query(
      `
    SELECT orders.*, order_products.id, AS "orderedProducts"
    FROM orders
    JOIN order_products ON order_products."productId" = orders.id
    WHERE order_products."orderId" = $1;
  `,
      [id]
    );

    console.log("HERE ARE ORDERS w PRODUCTS", order);
    return order;
  } catch (error) {
    throw error;
  }
};

//  getAllOrders
//  select and return an array of orders, include their products

const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(`
        SELECT * FROM orders JOIN products ON orders.id = products.id;
        RETURNING *
        `);
    console.log("ALL ORDERS W PRODUCTS", orders);
    return [orders];
  } catch (error) {
    throw error;
  }
};

//  getOrdersByUser
// getOrdersByUser({ id })
//  select and return an array of orders made by user, include their products

//  getOrdersByProduct
// getOrdersByProduct({ id })
//  select and return an array of orders which have a specific productId in their order_products join, include their products

//  getCartByUser
// getCartByUser({ id }) or getCartByUser(user)
//  select one user's order (look up by orders."userId")
//  ...an order that that has status = created
//  return the order, include the order's products

//  createOrder
// createOrder({ status, userId })
//  create and return the new order

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
  }
};

const getOrdersById = async (id) => {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
    SELECT * FROM orders
    WHERE id = $1
    `,
      [id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOrderById,
  getAllOrders,
  createOrders,
};
