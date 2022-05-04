const express = require('express');
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

router.post('/:orderId/products', requiredNotSent({requiredParams: ['activityId', 'count', 'duration']}), async (req, res, next) => {
  try {
    const {activityId, count, duration} = req.body;
    const {routineId} = req.params;
    const foundRoutineActivities = await getRoutineActivitiesByRoutine({id: routineId});
    const existingRoutineActivities = foundRoutineActivities && foundRoutineActivities.filter(routineActivity => routineActivity.activityId === activityId);
    if(existingRoutineActivities && existingRoutineActivities.length) {
      next({
        name: 'RoutineActivityExistsError',
        message: `A routine_activity by that routineId ${routineId}, activityId ${activityId} combination already exists`
      });
    } else {
      const createdRoutineActivity = await addActivityToRoutine({ routineId, activityId, count, duration });
      if(createdRoutineActivity) {
        res.send(createdRoutineActivity);
      } else {
        next({
          name: 'FailedToCreate',
          message: `There was an error adding activity ${activityId} to routine ${routineId}`
        })
      }
    }
  } catch (error) {
    next(error);
  }
});


  module.exports = router;
