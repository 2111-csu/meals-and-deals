import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = ({ products }) => {
    const params = useParams()
    const id = params.productId
    const filteredProduct = products.filter((product) =>  +product.id === +id)
    const singleProduct = filteredProduct[0]
    if(singleProduct) {
        return <>
            <div className="singleProduct" key={singleProduct.id}>
                    <h2>{singleProduct.name}({singleProduct.price})</h2>
                    <p>{singleProduct.description}</p>
                    <img className="productImage" src={singleProduct.imageURL}/>
             </div>
    </>
    }
    else {
        return <>
            <div>Product Not Found</div>
        </>
    }
}

export default SingleProduct;