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

async function updateProduct({id, ...fields}) {   
const setString = Object.keys(fields).map(
    (key, index) => `"${ key }" =$${index + 1}`
).join(', ');

try {
    const { rows: [product] } = await client.query(`
    UPDATE products
    SET ${ setString }
    WHERE id=${ id }
    RETURNING *;
    `, Object.values(fields));
    
    return product;
} catch (error) {
    throw error;
};
};

async function updateUser({id, ...fields}) {   
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }" =$${index + 1}`
    ).join(', ');

    try {
      const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, Object.values(fields));
      
      return user;
    } catch (error) {
      throw error;
    };
    };


  module.exports = {
      destroyProduct,
      updateProduct,
      updateUser

  }