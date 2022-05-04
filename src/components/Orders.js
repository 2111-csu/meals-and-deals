import React, { useState, useEffect } from "react";

const Orders = ({ user, userId, getOrdersByUser, userName }) => {
  // getOrdersByUser tried before getOrderProductsById

  /// Does not render "Users" orders from getOrdersByUser to display  GET /users/:userId/orders (**owner).
  //Needs is user.isAdmin === true to display all.

  const [orders, setOrders] = useState([]);
  console.log("I AM USER", userName);
  console.log("USERs ID", userId);
  console.log("heres some user data ", user);

  useEffect(() => {
    const fetchOrdersByUser = async () => {
      const fetchedOrders = await getOrdersByUser();
      setOrders(fetchedOrders);
    };

    fetchOrdersByUser(user.id);
  }, [user]);

  //needs single order data to match params :orderId of logged in user.

  console.log(orders, "fetched");
  return (
    <>
      <h1>{userName}'s Orders</h1>
      {orders.map((order) => {
        return (
          <div className="orderLog" key={order.id}>
            <h2>
              {/* {order.product.name} */}
              {order.status} by {order.creatorName}
              {/* <p>{orders.userId.products}</p> */}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default Orders;
