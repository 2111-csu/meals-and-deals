import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { useHistory } from "react-router";

import {
  getAPIHealth,
  getProducts,
  getCartByUser,
  getOrdersByUser,
} from "../axios-services";

import "../style/App.css";
import {
  SingleProduct,
  RegisterLogin,
  Home,
  Account,
  Cart,
  Users,
  Checkout,
  SingleOrder,
  AdminSingleUser,
  Orders,
  AddProduct,
  ProductList,
} from ".";

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState({});
  const [localCart, setLocalCart] = useState({});
  const [userId, setUserId] = useState(Number);
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    
    const matchedToken = localStorage.getItem('token');
    const matchedUsername = localStorage.getItem('username');
    const matchedUserId = localStorage.getItem('userId');
    const matchedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(matchedUser)
    const matchedCart = localStorage.getItem('cart');
    const parsedCart = JSON.parse(matchedCart)
    if (matchedToken) {
      setToken(matchedToken);
    }
    if (matchedUsername) {
      setUserName(matchedUsername);
    }
    if (matchedUserId) {
      setUserId(matchedUserId);
    }
    if (parsedUser) {
      setUser(parsedUser);
    }
    if (parsedCart) {
      setCart(parsedCart);
    }
  }, [])
  
  // useEffect(() => {
  //   // follow this pattern inside your useEffect calls:
  //   // first, create an async function that will wrap your axios service adapter
  //   // invoke the adapter, await the response, and set the data
  //   const getAPIStatus = async () => {
  //     const { healthy } = await getAPIHealth();
  //     setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
  //   };
  //   const fetchProducts = async () => {
  //     const fetchedProducts = await getProducts();
  //     setProducts(fetchedProducts);
  //   }
  //   // const fetchCart = async () => {
  //   //   const fetchedCart = await getCartByUser(user);
  //   //   setCart(fetchedCart);
  //   // }
    

    //   // second, after you've defined your getter above
    //   // invoke it immediately after its declaration, inside the useEffect callback
  

  const props = {
    products,
    setProducts,
    token,
    setToken,
    userName,
    setUserName,
    userId,
    setUserId,
    user,
    setUser,
    cart,
    setCart,
    setMessage,
    message,
    getOrdersByUser,
    orders,
    localCart,
    setLocalCart,
    setCartItems,
    cartItems,
    orderId,
    setOrderId
  }

  return <>
    <header>
      <div className="app-container">
        
      </div>
      <Link to='/products' className='nav-link'>Meals</Link>
      <Link to='/' className='nav-link'>Home</Link>
      <Link to='/cart' className='nav-link'>Your Cart</Link>
      {
          token
            ? <>
              <Link to='/account' className='nav-link'>Account</Link>
              <button className='logout' onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              localStorage.removeItem('userId');
              localStorage.removeItem('user');
              localStorage.removeItem('cart');
              setUserName('');
              setUserId('');
              setToken('');
              setUser({});
              setCart({});
              setCartItems([]);
              history.push('/');
            }}>Logout</button> </>
            : <Link to='/account/login' className='nav-link'>Sign In</Link>
        }
    </header>
    <main>
      <Route exact path='/'>
        <Home {...props} />
      </Route>
      <Route exact path='/products'>
        <ProductList {...props} />
      </Route>
      <Route exact path='/products/:productId'>
        <SingleProduct {...props} />
      </Route>
      <Route exact path='/account/:method'>
        <RegisterLogin {...props} />
      </Route>
      <Route exact path='/account'>
        <Account {...props} />
      </Route>
      <Route exact path='/cart'>
        <Cart {...props} />  
      </Route>
      <Route exact path='/users'>
        <Users {...props} />
      </Route>
      <Route exact path='/cart/checkout'>
        <Checkout {...props} />
      </Route>
      <Route exact path="/orders">
          <Orders {...props} />
        </Route>
        <Route exact path="/orders/:orderId">
          <SingleOrder orders={orders} />
        </Route>
    </main>
  </>;
};

export default App;
