import React, {useEffect, useState} from 'react';
import { callApi } from '../axios-services';
import { useHistory } from 'react-router';

// const matchedCart = localStorage.getItem('cart');
// const parsedCart = JSON.parse(matchedCart)

const Cart = ({ token, user, setCart, cart, setCartItems, cartItems }) => {
    //const [ cartItems, setCartItems] = useState([]);
    const regetCart = async () => {
        const cart = await callApi({url: '/orders/cart', body: user, token})
        const cartProducts = cart&&cart[0]
        setCart(cart);
        if (cartProducts) {
            console.log("yeee")
            setCartItems(cartProducts.products)
        }
    };
    
    useEffect (() => {
        setCartItems([])
        const getCart = async () => {
           const cart = await callApi({url: '/orders/cart', token})
            if (parsedCart) {
                setCart(parsedCart);
            }
            if(cart) setCart(cart);
            const cartProducts = cart&&cart[0]
            if (cartProducts) {
                setCartItems(cartProducts.products)
            }
        };
        if (token) getCart();
        
        const matchedCart = localStorage.getItem('cart');
        const parsedCart = JSON.parse(matchedCart)
        // if (cartProducts) {
        //     console.log("yeee")
        //     setCartItems(cartProducts.products)
        // }
        if (!user.id && parsedCart) {
            setCartItems(parsedCart.products)
        }
    }, [token])
    
   const history = useHistory()
   
   const deleteProduct = async (Id) => {
       if(user.id) {
        const response = await callApi({url: `/order_products/${Id}`, method: 'DELETE', token})
        regetCart()
        return response
       }
       if(!user.id) {
        localStorage.removeItem('cart'); 
        setCartItems([])  
       }
    }    
//    const cartProducts = cart&&cart[0]
   
//    if (cartProducts) {
//        setCartItems(cartProducts.products)
//     }
//     if (!user.id && parsedCart) {
//         setCartItems(parsedCart.products)
//     }
    console.log('cartitems', cartItems)
   
   return <>
        <div>
            Your Cart:
            {cartItems.map((product) => {
            return (
                <div className="cartProduct" key={product.orderProductsId}>
                    <h2>{product.name}({product.price})x{product.quantity}<button key={product.orderProductsId} onClick={() => deleteProduct(product.orderProductsId)}>Remove Item</button></h2>
                </div>
                
            );
            })} 
            <button onClick={()=>history.push('/cart/checkout')}>Go To Checkout</button>
        </div>
    </>;
};

export default Cart;