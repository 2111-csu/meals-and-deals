import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callApi, getCartByUser } from '../axios-services';
let OrderId = ''
const quantityArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log('order id', OrderId)
const newObj = {products: []}

const ProductList = ({ products , setProducts, token, cart, user, setCart, setLocalCart, localCart}) => {
  OrderId = ''
  const [quantity, setQuantity] = useState('1');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [inStock, setInStock] = useState('')
  const [category, setCategory] = useState('') 
  console.log('cart', cart)
  const addProducttoCart = async (product) =>  {
    
   if (!user.id) {
      product.orderProductsId = product.id
      product.quantity = quantity
      //const newObj = {products: []}
      newObj.products.push(product)
      console.log('newobj', newObj)
      setLocalCart([newObj])
      localStorage.setItem('cart', JSON.stringify(newObj));
      console.log('local cart', localCart)
    } 
    if (user.id) {
      if (cart[0]) {
          const [cartObj] = cart
          if (cartObj) OrderId = cartObj.id
        }
        if (OrderId === '') {
          try {
              const newOrder = await callApi({
              url: '/orders',
              method: "POST",
              body: { status: 'created', userId: user.id, datePlaced: "04 / 22 / 2022"  },
              token,
            });
            if (newOrder) {
              OrderId = newOrder.id
            }
          }catch (error) {
          alert(error);
        }}
        try {
          const response = await callApi({
            url: `/orders/${OrderId}/products`,
            method: "POST",
            body: { productId: product.id, price: product.price, quantity: quantity },
            token,
          });
          const newCart = await getCartByUser(user, token)
          if (newCart) {
            console.log('new', newCart)
            setCart(newCart);
            setQuantity(1)
          }
          return response;
        } catch (error) {
          alert(error);
        }
     }
   };
   
   const getProducts = async () => {
    const products= await callApi({url: '/products'})
    setProducts(products);
  };
    
   useEffect (() => {
        getProducts();
    }, [])

    const handleSubmit = async(event, product) =>{
      event.preventDefault()
      console.log('button hit')
      await callApi({url: `/products/${product.id}`, method: 'PATCH', token, body: { name, description, price, imageURL, inStock, category} });
      //const productsResponse = await callApi({url: `/products`, method: "GET"})

      //setProducts(productsResponse);
      setName('');
      setDescription('');
      setPrice('');
      setImageURL('');
      setInStock('');
      setCategory('');
      getProducts()
  };

  const deleteProduct = async (product) =>  {
    await callApi({url: `/products/${product.id}`, method: 'DELETE', token})
    getProducts()
  }
  
    return <>
        {/* <h1>Meals-And-Deals Product Listings</h1> */}
        { (user.isAdmin) ? products.map((product) => {
          return (
              <div className="singleProduct" key={product.id}>
                  <Link to={`/products/${product.id}`}><h2>{product.name}({product.price})</h2></Link>
                  <p>{product.description}</p>
                  <img className="productImage" src={product.imageURL} alt='Product'/>
                  <form onSubmit={(event) => handleSubmit(event, product)} >
                    <input type='text' placeholder='New Product Name' value={name} onChange={(event) => setName(event.target.value)} />
                    <input type='text' placeholder='New Product Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                    <input type='text' placeholder='New Product Price' value={price} onChange={(event) => setPrice(event.target.value)} />
                    <input type='text' placeholder='New Product ImageURL' value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
                    <input type='text' placeholder='New Product InStock' value={inStock} onChange={(event) => setInStock(event.target.value)} />
                    <input type='text' placeholder='New Product Category' value={category} onChange={(event) => setCategory(event.target.value)} />
                    <button type="submit">Edit Product</button>
                  </form>
                  <button key={product.id} onClick={() => deleteProduct(product)}>Delete Product</button>
              </div>
          );
      })
        : 
        products.map((product) => {
        return (
            <div className="singleProduct" key={product.id}>
                <Link to={`/products/${product.id}`}><h2>{product.name}({product.price})</h2></Link>
                <p>{product.description}</p>
                <img className="productImage" src={product.imageURL} alt='Product'/>
                <select onChange={(event) => setQuantity(event.target.value)}>
                  {quantityArray.map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                  ))}
                </select>
                <button key={product.id} onClick={() => addProducttoCart(product)}>Add to Cart</button>
            </div>
        );
    })
      
      }
      
        
    </>
};

export default ProductList;
