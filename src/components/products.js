import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callApi, getCartByUser } from '../axios-services';

const Products = ({ products, getProducts, setProducts, token, cart, user, setCart}) => {
    const addProducttoCart = async (product) =>  {
        const [cartObj] = cart
        const cartProducts = cartObj.products
        const cartProd = cartProducts[0]
        const OrderId = cartProd.orderId
        
        try {
          const response = await callApi({
            url: `/orders/${OrderId}/products`,
            method: "POST",
            body: { productId: product.id, price: product.price, quantity: 1 },
            token,
          });
          const newCart = await getCartByUser(user, token)
          if (newCart) {
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
          }
          return response;
        } catch (error) {
          alert(error);
        }
      };
    
    useEffect (() => {
        const getProducts = async () => {
            const products= await callApi({url: '/products'})
            setProducts(products);
        };
        getProducts();
    }, [])
  
    return <>
        {/* <h1>Meals-And-Deals Product Listings</h1> */}
        {products.map((product) => {
            return (
                <div className="singleProduct" key={product.id}>
                    <Link to={`/products/${product.id}`}><h2>{product.name}({product.price})</h2></Link>
                    <p>{product.description}</p>
                    <img className="productImage" src={product.imageURL} alt='Product'/>
                    <button key={product.id} onClick={() => addProducttoCart(product)}>Add to Cart</button>
                </div>
            );
        })}
        
    </>
}

export default Products;