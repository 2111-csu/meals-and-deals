const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require("./utils");
const client = require('../db/client');
const { updateOrderProduct, getOrderById, destroyOrderProduct, getOrderProductById } = require("../db");
const { JWT_SECRET = 'soSecret' } = process.env;


router.patch('/:orderProductId', requireUser, async (req, res, next) => {

    const { quantity, price } = req.body;
    const { orderProductId } = req.params;
    const fields = {};

    if (quantity) {
        fields.quantity = quantity;
    }

    if (price) {
        fields.price = price;
    }

    try {
        const product = await updateOrderProduct({
            id: orderProductId,
            ...fields,
        });
        const order = await getOrderById(product.orderId);

        res.send(product);

    } catch (error) {
        next(error);
    }
});

router.delete('/:orderProductId', requireUser, async (req, res, next) => {
    const { orderProductId } = req.params;

    try {
        const product = await destroyOrderProduct(orderProductId);
        res.send(product);
    } catch (error) {
        next(error);
    }
});

module.exports = router;