const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require("./utils");
const client = require('../db/client');
const { JWT_SECRET = 'soSecret' } = process.env;

const {
    getAllOrders,
    createOrders,
    getAllUsers,
    getUserById,
    getOrdersByUser,
    getUserByUsername,
    getCartByUser,
  } = require("../db");
  
// GET /orders (*admin)  
router.get ("/", async (req, res, next) => {
    try{
        const orders = await getAllOrders();
        //need to add isAdmin for user
        res.send(orders);
    }   catch (error) {
        next(error);
    }
});
  
// /api/orders
router.get("/cart", requireUser, async (req, res, next) => {
  const {id} = req.user
  try {
    const cart = await getCartByUser(id);
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


router.get('/:userId/orders',  async (req, res, next) => {

try{
    const {userId}= req.params;
    const user = await getUserByUsername(userId);
    // the other db function to try would be getUserById(userId)
    const order = await getCartByUser(user);
    res.send(order);
}catch(error){
    next(error);
}
});

  module.exports = router;
