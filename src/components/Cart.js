import React, {useEffect} from 'react';
import { callApi } from '../axios-services';


const Cart = ({ token, user, setCart, cart }) => {
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
   const deleteProduct = async (Id) => {
        console.log('clicked', Id)
   }    
   const cartProducts = cart[0]
   let cartItems = []
   console.log(cartProducts)
   if (cartProducts) {
       cartItems = cartProducts.products
       console.log(cartItems)
   }
   return <>
        <div>
            Your Cart:
            {cartItems.map((product) => {
            return (
                <div className="cartProduct" key={product.orderProductsId}>
                    <h2>{product.name}(${product.price})x{product.quantity}<button key={product.orderProductsId} onClick={() => deleteProduct(product.orderProductsId)}>Remove Item</button></h2>
                </div>
            );
            })} 
        </div>
    </>;
};

export default Cart;