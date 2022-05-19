import React, { useEffect } from 'react';
import { callApi } from '../axios-services';
import { useHistory } from 'react-router';

const Cart = ({ token, user, setCart, cart, setCartItems, cartItems }) => {
    
    const regetCart = async () => {
        const cart = await callApi({url: '/orders/cart', body: user, token})
        const cartProducts = cart&&cart[0]
        setCart(cart);
        if (cartProducts) {
            setCartItems(cartProducts.products)
        }
    };
    
    useEffect (() => {
        setCartItems([])
        const getCart = async () => {
           const cart = await callApi({url: '/orders/cart', token})
            
            if(cart) setCart(cart);
              const cartProducts = cart&&cart[0]
            if (cartProducts) {
                setCartItems(cartProducts.products)
            }
        };
        if (token) getCart();
        
      }, [token])
    
   const history = useHistory()
   
   const deleteProduct = async (Id) => {
       if(user.id) {
        const response = await callApi({url: `/order_products/${Id}`, method: 'DELETE', token})
        regetCart()
        return response
       }
       if(!user.id) {
         setCartItems([])  
       }
    }    

    return (
        <>
          <div>
          <img src="images/homepage.png" className="home" alt="come to meals-and-deals"/>
            <div>{!cartItems[0] ?
              <h1>Your Cart is Empty</h1> : null
            }</div>
            {cartItems.map((product) => {
              return (
                <div className="cartProduct" key={product.orderProductsId}>
                  <h2>
                    {product.name}({product.price})x{product.quantity}
                    <br/>
                    <button
                      key={product.orderProductsId}
                      className='removeItem'
                      onClick={() => deleteProduct(product.orderProductsId)}
                    >
                      Remove Item
                    </button>
                  </h2>
                </div>
              );
            })}
            {!cartItems[0] ?
              <button className="checkout-button" onClick={() => history.push("/products")}>
                View Meals
              </button>
              :
              !user.id ?
              <button className="checkout-button" onClick={() => history.push("/account/login")}>
                Sign In To Checkout
              </button> 
              :
              <button className="checkout-button" onClick={() => history.push("/cart/checkout")}>
                Go To Checkout
              </button> 
            }
          </div>
        </>
      )
};

export default Cart;
