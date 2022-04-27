const client = require("../client");

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

//  getOrderById
// getOrderById(id)
const getOrderById = async (id) => {
  try {
    //  return the order, include the order's products
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT * FROM orders
      WHERE id=$1
    `,
      [id]
    );
    // return the orders
    return order;
  } catch (error) {
    console.log("error: ", error);
  }
};

//  getAllOrders
//  select and return an array of orders, include their products

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

async function createOrder(order) {
  // Get the field from the passed in object
  const { status, userId, datePlaced } = orders;

  try {
    // insert the correct field into the users table
    // remember to return the new row from the query
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders (status, "userId", "datePlaced") 
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [order]
    );
    // return the new user
    console.log("orders in createOrder", order);
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrders,
};
