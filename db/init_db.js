const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await  client.query(`
  //   DROP TABLE IF EXISTS order_products;
  //   DROP TABLE IF EXISTS orders;
  //   DROP TABLE IF EXISTS products;
  //   DROP TABLE IF EXISTS users;
  `)
    // build tables in correct order
    await  client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price VARCHAR(255) NOT NULL,
        imageURL NVARCHAR(n),
        "inStock" NOT NULL BOOLEAN DEFAULT false,
        category TEXT NOT NULL
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
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
