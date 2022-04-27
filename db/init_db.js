const { 
  createOrders,
  createProduct
} = require("./");
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
    const productsToCreate = [
      {
        name: "created",
        description: "Pasta",
        price: "$30",
        imageURL:
          "https://media.istockphoto.com/photos/penne-pasta-with-mushrooms-chicken-spinach-and-cream-sauce-cuisine-picture-id1147319538?s=612x612",
        inStock: true,
        category: "Dinner",
      },
      {
        name: "created",
        description: "Chicken Teriyaki",
        price: "$30",
        imageURL:
          "https://media.istockphoto.com/photos/plate-of-japanese-chicken-teriyaki-picture-id536109727?k=20&m=536109727&s=612x612&w=0&h=yjfMcmAH_OEG6LpSkcIe30BbBpX9jy3sbA6cep4_CNI=",
        inStock: true,
        category: "Dinner",
      },
      {
        name: "cancelled",
        description: "French Onion Soup",
        price: "$10",
        imageURL:
          "https://media.istockphoto.com/photos/french-onion-gratin-soup-picture-id601123554?s=612x612",
        inStock: true,
        category: "Lunch",
      },
      {
        name: "created",
        description: "Spinach Salad",
        price: "$10",
        imageURL:
          "https://media.istockphoto.com/photos/vegan-thai-green-curry-with-tofu-sweet-potato-corn-and-spinach-top-picture-id1212759107?k=20&m=1212759107&s=612x612&w=0&h=cpmIeGocHnX0RjRz-lS_8pzfiLwH8CLYFanUskLv1LM=",
        inStock: true,
        category: "Lunch",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products Created: ", products);
    console.log("Finished creating products");
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
