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

const getOrdersById = async (id) => {
  try{
    const {rows: [orders]} = await client.query(`
    SELECT * FROM orders
    WHERE id = $1
    `, [id]);
    return orders;
  }catch (error) {
    throw error;
  }
};



module.exports = {
  createOrders,
};
