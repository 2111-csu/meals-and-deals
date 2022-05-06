import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ user, orders }) => {
  console.log(orders, "fetched");

  return (
    <>
      <h1>Admin Log of Orders</h1>

      {orders.map((order) => {
        console.log("need order", order.products);
        return (
          <>
            <div className="adminOrderLog" key={order.id}>
              {user.isAdmin === true ? (
                <h2>
                  {order.status} by {order.creatorName} on {order.datePlaced}
                  <Link to={`/orders/${order.id}`}>See Details</Link>
                </h2>
              ) : null}
            </div>
          </>
        );
      })}
      <> SEE ORDERS </>
    </>
  );
};

export default Orders;
