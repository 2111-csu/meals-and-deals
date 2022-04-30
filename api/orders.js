const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrders,
  getUserById,
  getUserByUsername,
  getCartByUser,
} = require("../db");

//  GET /orders (*admin)
// Return a list of orders, include the products with them
router.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    ////need to add isAdmin from user
    res.send(orders);
    console.log("orders?", orders);
  } catch (error) {
    next(error);
  }
});

//  GET /orders/cart (*)
// Return the current user's order with status='created' (synonymous to a 'cart'). Use database adapter getCartByUser

// /orders/orders/cart?
router.get("/orders/cart", async (req, res, next) => {
  try {
    // const user = await getUserById(userId);
    // const cart = await getCartByUser(user);
    // res.send(cart);
    res.send(`orders in cart`);
  } catch (error) {
    next(error);
  }
});

//  POST /orders (*)
// Create a new order. Should initially be status = created.

router.post("/", async (req, res, next) => {
  try {
    const { status, userId, dateplaced, creatorName, products } = req.body;
    const order = await createOrders({
      status,
      userId,
      dateplaced,
      creatorName,
      products,
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

//  GET /users/:userId/orders (**)

router.get("/:userId/orders", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserByUsername(userId);
    // the other db function to try would be getUserById(userId)
    const order = await getCartByUser(user);
    res.send(order);
  } catch (error) {
    next(error);
  }
});
// Get a list of orders for a particular user.

module.exports = router;
