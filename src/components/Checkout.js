import React, { useEffect } from "react";
import { callApi } from "../axios-services";
import { useHistory } from "react-router";

const Checkout = ({ token, user, setCart, cart, setMessage }) => {
  //     let cartItems = []
  //     useEffect (() => {
  //         const getCart = async () => {
  //             const [cart] = await callApi({url: '/orders/cart', body: user, token})
  //             setCart(cart);
  //             console.log(cart)
  //             cartItems = cart.products
  //         };
  //         getCart();
  //     }, [])
  const history = useHistory();
  const deleteProduct = async (Id) => {
    const response = await callApi({
      url: `/order_products/${Id}`,
      method: "DELETE",
      token,
    });
    console.log(response);
    setMessage("Your Order has beeen Canceled");
    return response;
  };

  const completeOrder = async (orderId) => {
    const response = await callApi({
      url: `/orders/${orderId}`,
      method: "POST",
      token,
    });
    console.log(response);
    return response;
  };
  const cancelOrder = async (orderId) => {
    const response = await callApi({
      url: `/orders/${orderId}`,
      method: "DELETE",
      token,
    });
    console.log(response);
    history.push("/");
    return response;
  };
  const cartProducts = cart[0];
  let cartItems = [];
  let item = {};
  console.log("cart", cart);
  console.log(cartProducts);
  if (cartProducts) {
    cartItems = cartProducts.products;
    item = cartItems[0];
    console.log("cartITems", cartItems);
  }
  return (
    <>
      <div>
        Checkout
        <>
          <div>
            <h1>{user.username}</h1>
            <h2>
              {user.firstname} {user.lastname}
            </h2>
            <h2>{user.email}</h2>
          </div>
        </>
        Your Cart:
        {cartItems.map((product) => {
          return (
            <div className="cartProduct" key={product.orderProductsId}>
              <h2>
                {product.name}(${product.price})x{product.quantity}
                <button
                  key={product.orderProductsId}
                  onClick={() => deleteProduct(product.orderProductsId)}
                >
                  Remove Item
                </button>
              </h2>
            </div>
          );
        })}
        <button onClick={() => cancelOrder(item.orderId)}>Cancel Order</button>
        <button onClick={() => completeOrder(item.orderId)}>
          Complete Order
        </button>
      </div>
    </>
  );
};

export default Checkout;
