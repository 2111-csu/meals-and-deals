import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ user, orders }) => {
  console.log(orders, "fetched");

  return (
    <>
      <h1>Admin Log of Orders</h1>
      <></>
      {orders.map((order) => {
        return (
          <>
            <div className="adminOrderLog" key={order.id}>
              {user.isAdmin === true ? (
                <h2>
                  {order.id} {order.status} <br /> by {order.creatorName} <br />
                  on {order.datePlaced}
                  {order.products.map((product) => {
                    return (
                      <>
                        <div className="productsOrders">
                          {product.name} {product.price}
                          {product.description}
                          <br />
                          <img
                            className="orderImage"
                            src={product.imageURL}
                            alt="Product"
                          />
                        </div>
                      </>
                    );
                  })}
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
