const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require("./utils");
const client = require('../db/client');
const { updateOrderProduct, getOrderById, destroyOrderProduct} = require("../db");
const { JWT_SECRET = 'soSecret' } = process.env;


router.patch('/:orderProductId', requireUser, async (req, res, next) =>{
    
    const {quantity, price} = req.body;
    const {orderProductId} = req.params;
    const {id} = req.user;
    const fields = {};
    
    if(quantity) {
        fields.quantity = quantity;
    }

    if (price) {
        fields.price = price;
    }

    try{
        const product = await updateOrderProduct({
            id: orderProductId,
            ...fields,
        });
        const order = await getOrderById(product.orderId);
        
            res.send(product);
        
    } catch(error) {
        next(error);
    }  
});

router.delete('/:orderProductId', requireUser, async (req, res, next) => {
    const { orderProductId } = req.params;

    try {
        const opId = await getOrderProductById(orderProductId);
        const userInfo = await getOrderById(opId.orderId);
        
        if (opId && userInfo.creatorId === req.user.id) {
            const product = await destroyOrderProduct(orderProductId);
            res.send(product);
        } else {
            next({
                name: 'OrderIDNotFoundError',
                message: 'That order ID does not exist'
            });
        }
    } catch (error) {
        next (error);
    }
});

module.exports = router;