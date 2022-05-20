import React from "react";
import { useParams } from "react-router-dom";

const SingleOrder = ({ orders }) => {
  const params = useParams();
  const id = params.orderId;
  const singleOrder = orders.filter((order) => +order.id === +id);
  const doneOrder = singleOrder[0];
  if (doneOrder) {
    return (
      <>
        <h2>Order {doneOrder.id}</h2>
        <p>
          {doneOrder.status} on {doneOrder.datePlaced}
        </p>
      </>
    );
  } else {
    return (
      <>
        <div>Order Loading...</div>
      </>
    );
  };
};

export default SingleOrder;
