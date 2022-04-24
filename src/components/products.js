import React, { useEffect } from "react";
import { callApi } from "../api";

const Products = ({ products, setProducts }) => {
  useEffect(() => {
    const getProducts = async () => {
      const data = await callApi({
        url: `/products`,
        method: "GET",
      });
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <>
      <h1>Meals-And-Deals Product Listings</h1>
      {products.map((product) => {
        return (
          <div className="singleProduct" key={product.id}>
            <h2> Product: {product.name}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Products;
