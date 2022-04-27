import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const SingleProduct = ({ products }) => {
  const params = useParams();
  const id = params.productId;
  const filteredProduct = products.filter((product) => product.id == id);
  const singleProduct = filteredProduct[0];
  console.log("single product", filteredProduct);
  if (singleProduct) {
    return (
      <>
        <li>{singleProduct.name}</li>
      </>
    );
  } else {
    return (
      <>
        <div>Product Not Found</div>
      </>
    );
  }
};
export default SingleProduct;
