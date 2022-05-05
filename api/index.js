const router = require("express").Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const client = require('../db/client');
const { JWT_SECRET = 'soSecret' } = process.env;


router.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});




// set `req.user` if possible

router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        console.log("req USER!!!", req.user);
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

router.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

const orderProductsRouter = require('./order_products');
 router.use('/order_products', orderProductsRouter);

const productsRouter = require('./products');
router.use('/products', productsRouter);

const ordersRouter = require('./orders');
router.use('/orders', ordersRouter);

const usersRouter = require('./users');
router.use('/users', usersRouter);

module.exports = router;
