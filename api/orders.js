const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrders,
  getAllUsers,
  getUserById,
  getOrdersByUser,
  getUserByUsername,
  getCartByUser,
} = require("../db");

const { requireUser } = require("./utils");

//  GET /orders (*admin)
// Return a list of orders, include the products with them

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    ////need to add isAdmin from user
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//  GET /orders/cart (*)
// Return the current user's order with status='created' (synonymous to a 'cart'). Use database adapter getCartByUser

// /api/orders
router.get("/cart", async (req, res, next) => {
  try {
    // const userId = await requireUser();
    // const user = await getUserById(users);
    console.log("USER?", user);
    // const user = await getOrdersByUser(id);
    console.log("IS THIS AN ID?", user);
    const cart = await getCartByUser(user);
    console.log("IS THIS A CART?", cart);
    res.send(cart);
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
