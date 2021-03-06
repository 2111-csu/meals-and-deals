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
  AddUser
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

  useEffect(() => {
    const fetchOrders= async () => {
      const fetchedOrders = await getOrdersByUser();
      console.log(fetchedOrders)
      setOrders(fetchedOrders);
    }
    fetchOrders()
  }, [token]
  )

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

  return (
    <>
      <header>
        <div className="app-container"></div>
        <nav className="nav">
          <Link to="/" className="nav-link" >
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Meals
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>

          {user.isAdmin === true ? (
            <>
              <Link to="/users" className="nav-link">
                Users
              </Link>
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </>
          ) : null}
          {token ? (
            <>
              <Link to="/account" className="nav-link">
                Account
              </Link>
              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("user");
                  localStorage.removeItem("cart");
                  setUserName("");
                  setUserId("");
                  setMessage("");
                  setToken("");
                  setOrderId("")
                  setUser({});
                  setCart({});
                  history.push("/");
                }}
              >
                Logout
              </button>

            </>
          ) : (
            <Link to="/account/login" className="nav-link">
              Sign In
            </Link>
          )}
        </nav>
      </header>
      <main>
        <Route exact path="/">
          <Home {...props} />
        </Route>
        <Route exact path="/products">
          <ProductList {...props} />
        </Route>
        <Route exact path="/products/:productId">
          <SingleProduct {...props} />
        </Route>
        <Route exact path="/account/:method">
          <RegisterLogin {...props} />
        </Route>
        <Route exact path="/account">
          <Account {...props} />
        </Route>
        <Route exact path="/cart">
          <Cart {...props} />
        </Route>
        <Route exact path="/users">
          <AddUser {...props} />
          <Users {...props} />
        </Route>
        <Route exact path="/users/:userId">
          <AdminSingleUser {...props} />
        </Route>
        <Route exact path="/cart/checkout">
          <Checkout {...props} />
        </Route>
        <Route exact path="/orders/:orderId">
          <SingleOrder orders={orders} />
        </Route>
        <Route exact path="/admin">
          <AddProduct {...props} />
          <Orders {...props} />
        </Route>
      </main>
    </>
  )
};

export default App;
