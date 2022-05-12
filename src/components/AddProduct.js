import React, { useEffect } from 'react';
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

    }}

export default AddProduct;