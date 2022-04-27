const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  const hashPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (firstName, lastName , email, username, password)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
    `,
      [firstName, lastName, email, username, hashPassword]
    );
    return user;
  } catch (error) {
    throw error;
  }
};
/* this adapter should fetch a list of users from your db */
async function getUser({ username, password }) {
  if (!username || !password) {
    console.log("users is", username);
    return;
  }
  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id = $1;
    `,
      [id]
    );
    if (!user) return null;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [username]
    );
    if (!rows || !rows.length) return null;
    const [user] = rows;
    return user;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  // add your database adapter fns here
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
