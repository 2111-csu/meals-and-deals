const client = require("../client");

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM products;
      `);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getProductById(id) {
  try {
    const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE id = $1
      `, [id]);
    return product;
  } catch (error) {
    throw error;
  };
};

async function createProduct({ name, description, price, imageURL, inStock, category }) {
  try {
    const { rows: [product] } = await client.query(`
        INSERT INTO products(name, description, price, "imageURL", "inStock", category) 
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *
      `, [name, description, price, imageURL, inStock, category]);
    return product;
  } catch (error) {
    throw error;
  };
};

async function attachProductsToOrders(orders) {
  // no side effects
  const ordersToReturn = [...orders];
  const binds = orders.map((_, index) => `$${index + 1}`).join(', ');
  const orderIds = orders.map(order => order.id);
  if (!orderIds?.length) return;

  try {
    // get the products, JOIN with order_products (so we can get an orderId), and only those that have those order ids on the order_products join
    const { rows: products } = await client.query(`
      SELECT products.*, order_products.quantity, order_products.price, order_products.id AS "orderProductsId", order_products."orderId"
      FROM products 
      JOIN order_products ON order_products."productId" = products.id
      WHERE order_products."orderId" IN (${binds});
    `, orderIds);

    // loop over the orders
    for (const order of ordersToReturn) {
      // filter the products to only include those that have this orderId
      const productsToAdd = products.filter(product => product.orderId === order.id);
      // attach the products to each single order
      order.products = productsToAdd;
    }
    return ordersToReturn;
  } catch (error) {
    throw error;
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  attachProductsToOrders
};