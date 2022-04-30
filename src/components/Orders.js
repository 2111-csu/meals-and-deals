import React from "react";

const Products = ({ orders }) => {
  return (
    <>
      <h1>Orders</h1>
      {orders.map((order) => {
        return (
          <div className="singleProduct" key={order.id}>
            <h2>
              {order.datePlaced}({order.status})
            </h2>
            <p>{orders.products}</p>
          </div>
        );
      })}
    </>
  );
};

export default Products;
