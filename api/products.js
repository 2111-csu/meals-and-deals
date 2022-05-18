const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, destroyProduct, updateProduct, getAllOrders } = require('../db')
const { requireUser } = require("./utils");

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


  router.post('/', requireUser, async (req, res, next) => {
    const { name, description, price, imageURL, inStock, category } = req.body;
    try {
        const newProduct = await createProduct({name, description, price, imageURL, inStock, category});
        res.send(newProduct);
    } catch (error) {
     throw (error);
    }
});

router.patch('/:productId', requireUser, async (req, res, next) => {
  const {productId} = req.params;
  const {name, description, price, imageURL, inStock, category} = req.body;
  try{
      const productToUpdate = await updateProduct({id: Number(productId), name, description, price, imageURL, inStock: Boolean(inStock), category  });
      res.send(productToUpdate)
  } catch (error){
  throw error;
  }
})

router.delete('/:productId', requireUser, async (req, res, next) => {
  try{
    const { productId } = req.params;
    const product = await destroyProduct((productId));

    res.send(product);

  }catch (error) {
    next(error);
  }
});

router.get('/:productId/orders', async (req, res, next) => {
  const { productId } = req.params;
  try{
      const products = await getAllOrders({id: productId});
      res.send(products)
  }catch(error){
      throw error;
  }
})




module.exports = router;