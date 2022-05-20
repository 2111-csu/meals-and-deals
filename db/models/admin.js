const client = require("../client");

async function destroyProduct(id) {
    try {
      await client.query(`
          DELETE FROM order_products 
          WHERE "productId" = $1
      `, [id]);
      const {rows: [product]} = await client.query(`
          DELETE FROM products 
          WHERE id = $1
          RETURNING *
      `, [id]);
      return product;
    } catch (error) {
      console.log('destroy produt error', error)
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
    console.log('update product error', error)
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