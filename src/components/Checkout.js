import React, { useEffect } from "react";
import { callApi } from "../axios-services";
import { useHistory } from "react-router";

const Checkout = ({ token, user, setCart, cart, setMessage, setOrderId }) => {
    let total = 0
    const history = useHistory()
     
    const completeOrder = async (orderId) => {
        const response = await callApi({url: `/orders/${orderId}`, method: 'POST', token})
        alert("Your Order Has Been Completed")
        setMessage("Your Order Has Been Completed")
        setCart({})
        setOrderId('')
        history.push('/')
        return response
    } 
    const cancelOrder = async (orderId) => {
        const response = await callApi({url: `/orders/${orderId}`, method: 'DELETE', token})
        setOrderId('')
        setCart({})
        setMessage("Your Order Has Been Canceled");
        history.push('/')
        
        return response
    }   
   const cartProducts = cart[0]
   let cartItems = []
   let item = {}
   
   if (cartProducts) {
       cartItems = cartProducts.products
       item = cartItems[0]
   }
   return (
    <>
      <div>
        
        <>
          <div>
            <h1>{user.username}</h1>
            <h2>
              {user.firstname} {user.lastname}
            </h2>
            <h2>{user.email}</h2>
          </div>
        </>
        
        {cartItems.map((product) => {
          total = total + (product.price.slice(1))*(product.quantity)
          return (
            <div className="cartProduct" key={product.orderProductsId}>
              <h2>
                {product.name}({product.price})x{product.quantity}
                
              </h2>
            </div>
          );
        })}
        <h1>Total: ${total}</h1>
        <button onClick={() => cancelOrder(item.orderId)}>Cancel Order</button>
        <button onClick={()=>history.push('/cart')}>Edit Order</button>
        <button onClick={() => completeOrder(item.orderId)}>
          Complete Order
        </button>
      </div>
    </>
  );
};

export default Checkout;
