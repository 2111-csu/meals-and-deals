const client = require("../client");

async function destroyProduct(id) {
    try {
      await client.query(`
          DELETE FROM order_products 
          WHERE "orderId" = $1 && status = "created"
      `, [id]);
      const {rows: [order]} = await client.query(`
          DELETE FROM orders 
          WHERE id = $1
          RETURNING *
      `, [id]);
      return order;
    } catch (error) {
      throw error;
    }
  }

  

  module.exports = {
      destroyProduct,
  }