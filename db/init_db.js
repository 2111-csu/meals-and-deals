const { createOrders } = require("./");
const client = require("./client");
console.log(client, "CLIENT");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;

    `);
    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`
        CREATE TABLE users(
          id  SERIAL PRIMARY KEY,
          firstName VARCHAR(255) UNIQUE NOT NULL,
          lastName VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          "imageURL" VARCHAR(500),
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false
          );
      `);
    await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          price VARCHAR(255) NOT NULL,
          "imageURL" VARCHAR(500),
          "inStock" BOOLEAN DEFAULT false,
          category TEXT NOT NULL
        );
      `);

    await client.query(`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          status VARCHAR(255) DEFAULT 'created',
          "userId" INTEGER REFERENCES users(id),
          "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
        );
      `);

    await client.query(`
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price VARCHAR(255) NOT NULL,
        quantity VARCHAR(255) NOT NULL DEFAULT '0'
        );
      `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    // be created, cancelled, completed) - also optionally, processing
    // const ordersToCreate = [
    //   {
    //     status: created,
    //     userId: 1,
    //     datePlaced: 04 / 21 / 2022,
    //   },
    //   {
    //     status: created,
    //     userId: 2,
    //     datePlaced: 04 / 22 / 2022,
    //   },
    //   {
    //     status: created,
    //     userId: 3,
    //     datePlaced: 04 / 23 / 2022,
    //   },
    //   {
    //     status: created,
    //     userId: 4,
    //     datePlaced: 04 / 24 / 2022,
    //   },
    // ];
    // const orders = await Promise.all(
    //   ordersToCreate.map((order) => createOrders(order))
    // );
    // console.log("Orders Created: ", orders);
    // console.log("Finished creating orders");
  } catch (error) {
    throw error;
  }
}

buildTables()
  // .then(createOrders)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables,
};
