import React, {useEffect, useState} from "react";
import { callApi } from '../axios-services';

const Account = ({user, token}) => {
    const [orderHistory, setOrderHistory] = useState([]);
    useEffect (() => {
        
        const getOrderHistory = async () => {
           const orders = await callApi({url: '/orders/orderhistory', token, user})
           if (orders) {
             setOrderHistory(orders)
           }
           console.log(orders)
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
            return (
              <>
                <div className="welcome" key={order}>
                    <h2>
                      Date Ordered: {order.datePlaced}
                      <br/>
                      Status: {order.status}
                      {order.products.map((product) => {
                        return (
                          <>
                            <div className="productsOrders">
                              {product.name} {product.price}
                             <br />
                          </div>
                          </>
                        );
                      })}
                    </h2>
                </div>
              </>
            );
          }) : <h1>No Past Orders</h1>
        }
    </>;
};

export default Account