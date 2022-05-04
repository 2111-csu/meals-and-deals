const apiRouter = require("express").Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const client = require('../db/client');
const { JWT_SECRET = 'soSecret' } = process.env;


apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});




// set `req.user` if possible

apiRouter.use(async (req, res, next) => {
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

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

// const orderProductsRouter = require('./orderProducts');
 //apiRouter.use('/order_products', orderProductsRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
