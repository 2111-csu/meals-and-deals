import React from 'react';

const Products = ({ products, getProducts, setProducts}) => {
    return <>
        <h1>Meals-And-Deals Product Listings</h1>
        {products.map((product) => {
            return (
                <div className="singleProduct" key={product.id}>
                    <h2>{product.name}({product.price})</h2>
                    <p>{product.description}</p>
                    <img className="productImage" src={product.imageURL} alt='Product'/>
                </div>
            );
        })}
        
    </>
}

export default Products;