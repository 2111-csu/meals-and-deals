import React, {useEffect, useState} from "react";
import { callApi } from '../axios-services';

const Account = ({user, token}) => {
    let total = 0
     const [orderHistory, setOrderHistory] = useState([]);
    useEffect (() => {
        
        const getOrderHistory = async () => {
           const orders = await callApi({url: '/orders/orderhistory', token, user})
           if (orders) {
             setOrderHistory(orders)
           }
        } 
        getOrderHistory()
    }, [token])    
   return <>
        <div className="account">
        <h1>Your Meals-And-Deals Account Information:</h1>
        <br/>
        <h2>Username: {user.username}</h2>
        <h2>First Name: {user.firstname} <br/> Last Name: {user.lastname}</h2>
        <h2>Email: {user.email}</h2>
        </div>
        <h1>Order History</h1>
        { orderHistory[0] ?
        orderHistory.map((order) => {
          total = 0
          return (
              <>
                <div className="welcome" key={order.orderId}>
                    <h2>
                      Date Ordered: {order.datePlaced.slice(0,10)}
                      <br/>
                      Status: {order.status}
                      {order.products.map((product) => {
                        total = total + (product.price.slice(1))*(product.quantity)
                        return (
                          <>
                            <div className="productsOrders">
                              {product.name}
                              <br/> 
                              {product.price}x{product.quantity}
                             <br />
                            </div>
                          </>
                        );
                      })}
                      <h1>Total: ${total}</h1>
                    </h2>
                </div>
              </>
            );
          }) : <h1>No Past Orders</h1>
        }
    </>;
};

export default Account