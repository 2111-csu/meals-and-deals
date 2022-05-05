const client = require("./client");
const { createProduct, completeOrder, getAllProducts, createOrders, createUser, getUser, createOrderProduct, getAllOrders, getAllUsers, getProductById, getUserById, getUserByUsername, getCartByUser, getOrderProductById, getOrderById } = require("./models");
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
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          "imageURL" VARCHAR(50000),
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
          "imageURL" VARCHAR(5000),
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
    const usersToCreate = [
      {
        id: 1,
        firstName: "Leah",
        lastName: "Lopez",
        email: "LLeah77@thismail.com",
        imageURL: "image.url",
        username: "77LLQueen",
        password: "Chocol8ch1p!",
        isAdmin: false,
      },
      {
        id: 2,
        firstName: "Simon",
        lastName: "Sayes",
        email: "simonSays@somemail.com",
        imageURL: "image.url",
        username: "SimonSays",
        password: "ifNotn0wNever!!",
        isAdmin: false,
      },
      {
        id: 3,
        firstName: "Daphne",
        lastName: "McDoogal",
        email: "DMD123@thismail.com",
        imageURL: "image.url",
        username: "Daphn33",
        password: "D_MD4eva",
        isAdmin: false,
      },
    ];

    const users = await Promise.all(
      usersToCreate.map((user) => createUser(user))
    );
    console.log("Users Created: ", users);
    console.log("Finished creating users");

    const ordersToCreate = [
      {
        status: "created",
        userId: 1,
        datePlaced: "04 / 21 / 2022",
      },
      {
        status: "created",
        userId: 2,
        datePlaced: "04 / 22 / 2022",
      },
      {
        status: "created",
        userId: 3,
        datePlaced: "04 / 23 / 2022",
      },
      {
        status: "created",
        userId: 2,
        datePlaced: "04 / 24 / 2022",
      },
    ];

    const orders = await Promise.all(
      ordersToCreate.map((order) => createOrders(order))
    );
    console.log("Orders Created: ", orders);
    console.log("Finished creating orders");

    const productsToCreate = [
      {
        name: "Pasta",
        description: "Yummy!",
        price: "$30",
        imageURL:
          "https://media.istockphoto.com/photos/penne-pasta-with-mushrooms-chicken-spinach-and-cream-sauce-cuisine-picture-id1147319538?s=612x612",
        inStock: true,
        category: "Dinner",
      },
      {
        name: "Chicken Teriyaki",
        description: "Sweet and salty",
        price: "$30",
        imageURL:
          "https://media.istockphoto.com/photos/french-onion-gratin-soup-picture-id601123554?s=612x612",
        inStock: true,
        category: "Dinner",
      },
      {
        name: "French Onion Soup",
        description: "Warm and gooey",
        price: "$10",
        imageURL:
          "https://media.istockphoto.com/photos/french-onion-gratin-soup-picture-id601123554?s=612x612",
        inStock: true,
        category: "Lunch",
      },
      {
        name: "Spinach Salad",
        description: "Light and healty",
        price: "$10",
        imageURL:
          "https://media.istockphoto.com/photos/french-onion-gratin-soup-picture-id601123554?s=612x612",
        inStock: true,
        category: "Lunch",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products Created: ", products);
    console.log("Finished creating products");

    const orderProductsToCreate =[
      {orderId: 1, productId: 1, price: 30, quantity: 2},
      {orderId: 2, productId: 2, price: 30, quantity: 3},
      {orderId: 1, productId: 3, price: 10, quantity: 3},
      {orderId: 2, productId: 4, price: 10, quantity: 1},
      {orderId: 3, productId: 1, price: 30, quantity: 2},
      {orderId: 3, productId: 1, price: 30, quantity: 1},
    ]
      const orderProducts = await Promise.all(
        orderProductsToCreate.map((orderProduct) => createOrderProduct(orderProduct)));
      
      console.log("orderProducts Created: ", orderProducts);
      console.log("Finished creating orderProducts");
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try{
    console.log("Starting to test database...");

    console.log("Calling getAllUsers");
    const users1 = await getAllUsers();
    console.log("Result:", users1);

    console.log("Calling getAllProducts");
    const products1 = await getAllProducts();
    console.log("Result:", products1);

    console.log("Calling getAllOrders");
    const orders1 = await getAllOrders();
    console.log("Result:", orders1);

    console.log("Calling getProductById with 1");
    const productsId = await getProductById(1);
    console.log("Result:", productsId);

    console.log("Calling getUserById with 2");
    const simone = await getUserById(2);
    console.log("Result:", simone);

    console.log("Calling getOrderById with 1");
    const simone4 = await getOrderById(1);
    console.log("Result:", simone4);


    console.log("Calling getOrderProductById with 2");
    const getOrderProductSimone = await getOrderProductById(2);
    console.log("Result:", getOrderProductSimone);

    console.log("Calling getUserByUsername with 1");
    const simone1 = await getUserByUsername("77LLQueen");
    console.log("Result:", simone1);

    console.log("Calling getCartByUser with 1");
    const simone2 = await getCartByUser(1);
    console.log("Result:", simone2);

    console.log("Calling completeOrder with 2");
    const simoneOrder = await completeOrder(2);
    console.log("Result:", simoneOrder);

    console.log("Finished database tests");
  } catch (error) {
    console.log("Error during testDB");
  }  
}

buildTables()
  .then(populateInitialData)
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables,
};
