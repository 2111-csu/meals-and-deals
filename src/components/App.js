import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getAPIHealth, getProducts } from '../axios-services';
import '../style/App.css';
import {
  Products,
  SingleProduct,
  RegisterLogin,
  Home,
  Account, 
  Cart,
  Users
} from './';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({})
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(Number);
  const history = useHistory();
  
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

   
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const matchedToken = localStorage.getItem('token');
    const matchedUsername = localStorage.getItem('username');
    const matchedUserId = localStorage.getItem('userId');
    const matchedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(matchedUser)
    if (matchedToken) {
      setToken(matchedToken);
    };
    if (matchedUsername) {
      setUserName(matchedUsername);
    };
    if (matchedUserId) {
      setUserId(matchedUserId);
    }
    if (parsedUser) {
      setUser(parsedUser);
    }
  }, [])

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
    setUser
  }

  return <>
    <header>
      <div className="app-container">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
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
              setUserName('');
              setToken('');
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
        <Products {...props} />
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
      {/* <Route exact path='/cart'>
        <Users {...props} />
      </Route> */}
    </main>
  </>;
};

export default App;
