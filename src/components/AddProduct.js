import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callApi } from '../axios-services';

const AddProduct = ({ token, setProducts }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const[imageURL, setImageURL] = useState('')
    const [inStock, setInStock] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = async(event) =>{
        event.preventDefault();

        await callApi({url: '/products', method: 'POST', token, body: { name, description, price, imageURL, inStock, category} });
        const productsResponse = await callApi({url: `/products`, method: "GET"})

        setProducts(productsResponse);
        setName('');
        setDescription('');
        setPrice('');
        setImageURL('');
        setInStock('');
        setCategory('');
    };

    const reRenderProducts = async () => {
    const allProducts = await callApi({url:`/products`, method: "GET"});
    setProducts(allProducts);
    reRenderProducts();
};

return <>
<br/>
    <h2>Create a new Product for Meals and Deals</h2>
    <br/>
     <form onSubmit={handleSubmit} >
            <input type='text' placeholder='New Product Name' value={name} onChange={(event) => setName(event.target.value)} />
            <input type='text' placeholder='New Product Description' value={description} onChange={(event) => setDescription(event.target.value)} />
            <input type='text' placeholder='New Product Price' value={price} onChange={(event) => setPrice(event.target.value)} />
            <input type='text' placeholder='New Product ImageURL' value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
            <input type='text' placeholder='New Product InStock' value={inStock} onChange={(event) => setInStock(event.target.value)} />
            <input type='text' placeholder='New Product Category' value={category} onChange={(event) => setCategory(event.target.value)} />
            <button type="submit">Submit</button>
    </form>
    </>
}

export default AddProduct;