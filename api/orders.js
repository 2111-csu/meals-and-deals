const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../db");

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});
//  GET /orders (*admin)
// Return a list of orders, include the products with them

//  GET /orders/cart (*)
// Return the current user's order with status='created' (synonymous to a 'cart'). Use database adapter getCartByUser

//  POST /orders (*)
// Create a new order. Should initially be status = created.

//  GET /users/:userId/orders (**)
// Get a list of orders for a particular user.

module.exports = router;
