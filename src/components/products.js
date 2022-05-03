import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callApi } from '../axios-services';

const Products = ({ products, getProducts, setProducts}) => {
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
                </div>
            );
        })}
        
    </>
}

export default Products;