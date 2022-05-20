const client = require("./client");
const {
  createProduct,
  completeOrder,
  getAllProducts,
  createOrders,
  createUser,
  getUser,
  createOrderProduct,
  getAllOrders,
  getAllUsers,
  getProductById,
  getUserById,
  getUserByUsername,
  getCartByUser,
  getOrderProductById,
  getOrderById,
} = require("./models");
console.log(client, "CLIENT");

async function buildTables() {
  try {
    client.connect();
    // drop tables in correct order
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order

    await client.query(`
      DROP TABLE IF EXISTS reviews;
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
      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) CHECK ( content > 4 :: VARCHAR),
        stars INTEGER NOT NULL CHECK( stars >= 0 AND stars <=5),
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id)
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
        isAdmin: true,
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
      {
        id: 4,
        firstName: "Sarah",
        lastName: "Jones",
        email: "sjones@thismail.com",
        imageURL: "image.url",
        username: "SaJo145",
        password: "PurpleStar34",
        isAdmin: true,
      },
      {
        id: 5,
        firstName: "Oliver",
        lastName: "Fields",
        email: "ofields@thismail.com",
        imageURL: "image.url",
        username: "Oliv88",
        password: "CampSum45",
        isAdmin: false,
      },
      {
        id: 6,
        firstName: "Theodore",
        lastName: "Ellis",
        email: "TheoEllis@thismail.com",
        imageURL: "image.url",
        username: "Theo90",
        password: "CaliWaves67",
        isAdmin: false,
      },
      {
        id: 7,
        firstName: "Ella",
        lastName: "Andersen",
        email: "eAndersen@thismail.com",
        imageURL: "image.url",
        username: "EllaAnd90",
        password: "RivRoc145",
        isAdmin: false,
      },
      {
        id: 8,
        firstName: "Luna",
        lastName: "Davis",
        email: "lunaDav@thismail.com",
        imageURL: "image.url",
        username: "LunaDav8",
        password: "Sky67234",
        isAdmin: false,
      },

      {
      id: 9,
      firstName: "Violet",
      lastName: "Williams",
      email: "violetw@thismail.com",
      imageURL: "image.url",
      username: "Williams78",
      password: "Violet19!",
      isAdmin: false,
    },

    {
    id: 8,
    firstName: "Susie",
    lastName: "Johnson",
    email: "susieJohnson@thismail.com",
    imageURL: "image.url",
    username: "Susie890",
    password: "Peonies45",
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
        datePlaced: "04 / 01 / 2022",
      },
      {
        status: "created",
        userId: 2,
        datePlaced: "04 / 02 / 2022",
      },
      {
        status: "created",
        userId: 3,
        datePlaced: "04 / 12 / 2022",
      },
      {
        status: "created",
        userId: 8,
        datePlaced: "04 / 14 / 2022",
      },
      {
        status: "created",
        userId: 5,
        datePlaced: "04 / 21 / 2022",
      }, 
      {
        status: "created",
        userId: 7,
        datePlaced: "04 / 22 / 2022",
      }, 
      {
        status: "created",
        userId: 7,
        datePlaced: "04 / 23 / 2022",
      },
      
      {
        status: "created",
        userId: 6,
        datePlaced: "04 / 12 / 2022",
      }, 
      {
        status: "created",
        userId: 1,
        datePlaced: "04 / 15 / 2022",
      },
      {
        status: "created",
        userId: 8,
        datePlaced: "04 / 15 / 2022",
      },
    ];

    const orders = await Promise.all(
      ordersToCreate.map((order) => createOrders(order))
    );
    console.log("Orders Created: ", orders);
    console.log("Finished creating orders");

  
    const productsToCreate = [
      {
        name: "Alfredo Pasta",
        description: "Yummy!",
        price: "$30",
        imageURL:
          "https://images.unsplash.com/photo-1587206668283-c21d974993c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        inStock: true,
        category: "Dinner",
      },
      {
        name: "Chicken Teriyaki",
        description: "Sweet and salty",
        price: "$30",
        imageURL:
          "https://images.unsplash.com/photo-1609183480237-ccbb2d7c5772?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070",
        inStock: true,
        category: "Dinner",
      },
      {
        name: "French Onion Soup",
        description: "Warm and gooey",
        price: "$10",
        imageURL:
          "https://images.unsplash.com/photo-1549203438-a7696aed4dac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwb25pb24lMjBzb3VwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60",
        inStock: true,
        category: "Lunch",
      },
      {
        name: "Spinach Salad",
        description: "Light and healty",
        price: "$10",
        imageURL:
          "https://images.unsplash.com/photo-1601312539737-ba231b8fee5a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774",
        inStock: true,
        category: "Lunch",
      },
      {
        name: "Buddha Bowl",
        description: "Nutrient Packed!",
        price: "$20",
        imageURL:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Plant Based",
      },
      {
        name: "Blueberry Banana French Toast",
        description: "Sweet and Healthy",
        price: "$15",
        imageURL:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Breakfast",
      },
      {
        name: "Chickpea Tacos",
        description: "Not just for Tuesdays",
        price: "$30",
        imageURL:
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Plant Based",
      },
      {
        name: "Chicken Ramen",
        description: "Warm Comforting",
        price: "$30",
        imageURL:
          "https://images.unsplash.com/photo-1540162416395-16f7dfbb68d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTYzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Soups ",
      },

      {
        name: "Bowtie Pasta",
        description: "Tossed with basil pesto with tomatoes",
        price: "$25",
        imageURL:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Plant Based",
      },
      {
        name: "Chicken Sandwich",
        description: "Fried chicken with red onions on a sesame seed bun",
        price: "$25",
        imageURL:
          "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Sandwich",
      },
      {
        name: "Special Chicken Sandwich",
        description: "Crunchy chicken with special sauce",
        price: "$25",
        imageURL:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NzQ3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Sandwich",
      },
      {
        name: "Steak Tacos",
        description: "Warm Comforting",
        price: "$20",
        imageURL:
          "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Carnivore",
      },

      {
        name: "Cheese Pizza",
        description: "Tradition personal pan",
        price: "$25",
        imageURL:
          "https://images.unsplash.com/photo-1632428442713-1f13a6c56ec4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg0fHxwaXp6YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Vegetarian",
      },
      {
        name: "Cinnamon Rolls",
        description: "Yummy treat, enough to share",
        price: "$30",
        imageURL:
          "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTM3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Baked Goods",
      },
      {
        name: "Butternut Squash Soup",
        description: "Warm spices and a cashew cream",
        price: "$2o",
        imageURL:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NzQ3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        inStock: true,
        category: "Plant Based, Soup",
      },
      {
        name: "Pancake Stack",
        description: "Tall stack with berries",
        price: "$20",
        imageURL:
          "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVhbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
        inStock: true,
        category: "Breakfast",
      },

      {
        name: "Chicken Skewers",
        description: "Grilled with onions and peppers",
        price: "$25",
        imageURL:
          "https://images.unsplash.com/photo-1598514982901-ae62764ae75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        inStock: true,
        category: "Carnivore",
      },
      {
        name: "BBQ Grilled Steak Bites",
        description: "Topped with cilantro and green onions",
        price: "$30",
        imageURL:
          "https://images.unsplash.com/photo-1593030668930-8130abedd2b0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lYWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900",
        inStock: true,
        category: "Carnivore",
      },
    ];
    
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products Created: ", products);
    console.log("Finished creating products");

    const orderProductsToCreate =[
      {orderId: 1, productId: 1, price: '$30', quantity: 2},
      {orderId: 2, productId: 2, price: '$30', quantity: 3},
      {orderId: 1, productId: 3, price: '$10', quantity: 3},
      {orderId: 2, productId: 4, price: '$10', quantity: 1},
      {orderId: 3, productId: 1, price: '$30', quantity: 2},
      {orderId: 3, productId: 1, price: '$30', quantity: 1},
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
  try {
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
