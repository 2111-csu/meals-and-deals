import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { callApi, getCartByUser } from '../axios-services';
import AddProduct from './AddProduct';

const quantityArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
const newObj = {products: []}

const ProductList = ({ products , setProducts, token, cart, user, setCart, setLocalCart, orderId, setOrderId, userName}) => {
  const history = useHistory()
  const [quantity, setQuantity] = useState('1');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [inStock, setInStock] = useState('')
  const [category, setCategory] = useState('')
  const [productMessage, setProductMessage] = useState('')
  const [added, setAdded] = useState('')

  const addProducttoCart = async (product) =>  {
    if (!user.id) {
      product.orderProductsId = product.id
      product.quantity = quantity
      newObj.products.push(product)
      setLocalCart([newObj])
    } 
    if (user.id) {
      if (cart[0]) {
          const [cartObj] = cart
          if (cartObj) {
            orderId = cartObj.id
            setOrderId(cartObj.id)
          }
        }
        if (orderId === '') {
          try {
              const newOrder = await callApi({
              url: '/orders',
              method: "POST",
              body: { status: 'created', userId: user.id, datePlaced: new Date() },
              token,
            });
            if (newOrder) {
              orderId = newOrder.id
              setOrderId(newOrder.id)
            }
          }catch (error) {
          alert(error);
        }}
        try {
          const response = await callApi({
            url: `/orders/${orderId}/products`,
            method: "POST",
            body: { productId: product.id, price: product.price, quantity: quantity },
            token,
          });
          const newCart = await getCartByUser(user, token)
          if (newCart) {
            setCart(newCart);
            setAdded(product.name)
            setProductMessage(`Added x${quantity} ${product.name} To Cart `)
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
      await callApi({url: `/products/${product.id}`, method: 'PATCH', token, body: { name, description, price, imageURL, inStock, category} });
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

  return (
    <>
    {(userName ==='') ? <button className='message' onClick={() => history.push("/account/register")}>Sign In To Order</button> : <h2 className='message'>You are Signed in as {userName}</h2>}
    { (user.isAdmin) ? <AddProduct setProducts={setProducts} token={token} user={user}/> :null}
    { (user.isAdmin) ? 
          products.map((product) => {
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
            <Link to={`/products/${product.id}`}>
            <img
              className="productImage"
              src={product.imageURL}
              alt="Product"
            />
            
            <h2>
              {product.name}<br></br>{product.price}
            </h2>
            </Link>
            <p>{product.description}</p>
            
            { (userName) ? 
            <div> 
            <select onChange={(event) => setQuantity(event.target.value)}>
              {quantityArray.map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
            <button key={product.id} onClick={() => addProducttoCart(product)}>
              Add To Cart
            </button>
            {product.name === added ?
            <>
              <h2>{productMessage}</h2>
              <br></br>
              <button className='message' onClick={() => history.push("/cart")}>View Cart</button>
            </>
               : null}
            </div>
            : null}
          </div>
          
        );
      })}
      {(userName) ? <button className='message' onClick={() => history.push("/cart")}>View Cart</button> : null}
      </>
      
    
  );
};

export default ProductList;
