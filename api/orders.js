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
    getOrderById,
    addProductToOrder,
    updateOrderProduct,
    completeOrder,
    cancelOrder,
    getOrderHistory
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
      const { status, userId, datePlaced, creatorName, products } = req.body;
      const order = await createOrders({
        status,
        userId,
        datePlaced,
        creatorName,
        products,
      });
      res.send(order);
    } catch (error) {
      next(error);
    }
  });


router.get('/orderhistory', requireUser,  async (req, res, next) => {
    try{
      const userId = req.user.id
      const order = await getOrderHistory(userId);
      res.send(order);
   }catch(error){
      next(error);
   }
   });

router.post('/:orderId/products', async (req, res, next) => {
  const orderId = req.params.orderId;
  const {productId, price, quantity} = req.body;
  try{
    const allOrderProducts =  await getOrderById(orderId);
    const orderProducts = allOrderProducts[0].products
    const filteredOP = orderProducts.filter(product => product.productId == productId);
    
    if(filteredOP.length > 0){
      const newQuantity = filteredOP.quantity + quantity;
      const updateQuantity = await updateOrderProduct({id : filteredOP.id , quantity : newQuantity})
      res.send(updateQuantity)
      
    }else{
      const product = await addProductToOrder({orderId, productId, price, quantity});
      res.send(product);
    }
  } catch (error) {
    throw error;
  }
});

router.post('/:orderId', requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = await completeOrder(orderId)
  res.send(order)
  }catch (error) {
    next(error);
  }
})

router.delete('/:orderId', requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = await cancelOrder(orderId)
  res.send(order)
  }catch (error) {
    next(error);
  }
})

module.exports = router;
