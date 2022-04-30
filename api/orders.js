const express = require('express');
const router = express.Router();

router.get('/:userId/orders',  async (req, res, next) => {
    const {userId}= req.params;
    try{
      const user = await getUserByUsername(userId);
      // the other db function to try would be getUserById(userId)
      const order = await getCartByUser(user);
      res.send(order);
  }catch(error){
      next(error);
  }
  });

  module.exports = router;
