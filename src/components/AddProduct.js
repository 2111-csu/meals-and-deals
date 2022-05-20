import React, { useState } from 'react';
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
{/* <br/>
    <h2>Create a new Product for Meals and Deals</h2> */}
    <br/>
     <form className="product-form" onSubmit={handleSubmit} >
     <h2>Create A New Meals-And-Deals Meal:</h2>
            <input type='text' placeholder='Create Name' value={name} onChange={(event) => setName(event.target.value)} />
            <input type='text' placeholder='Create Description' value={description} onChange={(event) => setDescription(event.target.value)} />
            <input type='text' placeholder='Create Price' value={price} onChange={(event) => setPrice(event.target.value)} />
            <input type='text' placeholder='Create ImageURL' value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
            <input type='text' placeholder='Create InStock' value={inStock} onChange={(event) => setInStock(event.target.value)} />
            <input type='text' placeholder='Create Category' value={category} onChange={(event) => setCategory(event.target.value)} />
            <button type="submit">Submit</button>
    </form>
    </>
}

export default AddProduct;