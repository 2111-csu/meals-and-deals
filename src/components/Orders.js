import React, { useState, useEffect } from "react";

const Orders = ({ userId, getOrdersByUser, userName }) => {
  const [orders, setOrders] = useState([]);
  console.log("I AM USER", userName);
  console.log("USERs ID", userId);
  useEffect(() => {
    const fetchOrdersByUser = async () => {
      const fetchedOrders = await getOrdersByUser();
      setOrders(fetchedOrders);
    };

    fetchOrdersByUser({ userId });
  }, []);
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
