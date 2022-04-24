// grab our db client connection to use with our adapters
const client = require("../client");

const createUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (firstName, lastName , email, username, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [firstName, lastName, email, username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
};
/* this adapter should fetch a list of users from your db */

module.exports = {
  // add your database adapter fns here
  createUser,
};
