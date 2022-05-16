import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { callApi, getCartByUser } from "../axios-services";
let OrderId = "";
const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("order id", OrderId);
const ProductList = ({
  products,
  getProducts,
  setProducts,
  token,
  cart,
  user,
  setCart,
}) => {
  OrderId = "";
  const [quantity, setQuantity] = useState("1");
  console.log("cart", cart);
  const addProducttoCart = async (product) => {
    if (cart[0]) {
      const [cartObj] = cart;
      if (cartObj) OrderId = cartObj.id;
    }
    if (OrderId === "") {
      try {
        const newOrder = await callApi({
          url: "/orders",
          method: "POST",
          body: {
            status: "created",
            userId: user.id,
            datePlaced: "04 / 22 / 2022",
          },
          token,
        });
        if (newOrder) {
          OrderId = newOrder.id;
        }
      } catch (error) {
        alert(error);
      }
    }
    try {
      const response = await callApi({
        url: `/orders/${OrderId}/products`,
        method: "POST",
        body: {
          productId: product.id,
          price: product.price,
          quantity: quantity,
        },
        token,
      });
      const newCart = await getCartByUser(user, token);
      if (newCart) {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      return response;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const products = await callApi({ url: "/products" });
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <>
    <img src="images/modern.jpg" className="welcome" alt="welcome to meals-and-deals"/>
      {products.map((product) => {
        return (
          <div className="singleProduct" key={product.id}>
            <img
              className="productImage"
              src={product.imageURL}
              alt="Product"
            />
            <Link to={`/products/${product.id}`}>
              <h2>
                {product.name}({product.price})
              </h2>
            </Link>
            <p>{product.description}</p>
            {/* <img
              className="productImage"
              src={product.imageURL}
              alt="Product"
            /> */}
            <select onChange={(event) => setQuantity(event.target.value)}>
              {quantityArray.map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
            <button key={product.id} onClick={() => addProducttoCart(product)}>
              Add To Cart
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ProductList;
