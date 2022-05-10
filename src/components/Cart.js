import React, {useEffect} from 'react';
import { callApi } from '../axios-services';
import { useHistory } from 'react-router';

const matchedCart = localStorage.getItem('cart');
const parsedCart = JSON.parse(matchedCart)

const Cart = ({ token, user, setCart, cart }) => {
    let cartItems = []

    const regetCart = async () => {
        const cart = await callApi({url: '/orders/cart', body: user, token})
        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    
    useEffect (() => {
        const getCart = async () => {
            const cart = await callApi({url: '/orders/cart', body: user, token})
            if (parsedCart) {
                setCart(parsedCart);
            }
            if(cart) setCart(cart);
        };
        getCart();
    }, [])
   const history = useHistory()
   
   
   const deleteProduct = async (Id) => {
        const response = await callApi({url: `/order_products/${Id}`, method: 'DELETE', token})
        regetCart()
        return response
    }    
   const cartProducts = cart&&cart[0]
   
   if (cartProducts) {
       cartItems = cartProducts.products
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
            <button onClick={()=>history.push('/cart/checkout')}>Go To Checkout</button>
        </div>
    </>;
};

export default Cart;