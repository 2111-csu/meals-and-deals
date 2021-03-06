//  grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;


const createUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  isAdmin,
}) => {
  const hashPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (firstName, lastName , email, username, password, "isAdmin")
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username) DO NOTHING
      RETURNING *
    `,
      [firstName, lastName, email, username, hashPassword, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  };

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
  };
};

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
  };
};

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
          SELECT id, firstName, lastName, email, username, "imageURL" , "isAdmin"
          FROM users;
        `);
    return rows;
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

    const [user] = rows;

    return user;
  } catch (error) {
    console.error(error);
  };
};

module.exports = {
  // add your database adapter fns here
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
