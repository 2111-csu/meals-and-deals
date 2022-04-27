const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../db')

router.get('/', async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.send(products);
    } catch (error) {
      next(error)
    }
})
router.get('/:productId', async (req, res, next) => {
    const id = req.params.id
    try {
      const product = await getProductById(id);
      if(product) {
        res.send(product);
      } else {
        next({
          name: 'NotFound',
          message: `No Product found`
        })
      }
    } catch (error) {
      next(error);
    }
  });
module.exports = router;