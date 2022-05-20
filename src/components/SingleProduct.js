import React, {useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { callApi, getCartByUser } from '../axios-services';

const quantityArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]
const newObj = {products: []}

const SingleProduct = ({ products, user, token, orderId, setOrderId, cart, setCart, localCart, setLocalCart, userName }) => {
    const history = useHistory()
    const [singleQuantity, setSingleQuantity] = useState('1');
    const [singleProductMessage, setSingleProductMessage] = useState('')
    const params = useParams()
    const id = params.productId
    const filteredProduct = products.filter((product) =>  +product.id === +id)
    const singleProduct = filteredProduct[0]
    
    const addProducttoCart = async (product) =>  {
        if (!user.id) {
          product.orderProductsId = product.id
          product.quantity = singleQuantity
          newObj.products.push(product)
          setLocalCart([newObj])
          localStorage.setItem('cart', JSON.stringify(newObj));
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
                  body: { status: 'created', userId: user.id, datePlaced: "04 / 22 / 2022"  },
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
                body: { productId: product.id, price: product.price, quantity: singleQuantity },
                token,
              });
              const newCart = await getCartByUser(user, token)
              if (newCart) {
                setCart(newCart);
                setSingleProductMessage(`Added x${singleQuantity} ${product.name} To Cart `)
                setSingleQuantity(1)
              }
              return response;
            } catch (error) {
              alert(error);
            };
         };
       };

    if(singleProduct) {
        return (
          <>{(userName ==='') ? <button className='message' onClick={() => history.push("/account/register")}>Sign In To Order</button> : <h2 className='message'>You are Signed in as {userName}</h2>}
            <div className="singleProduct" key={singleProduct.id}>
              <img
                className="productImage"
                src={singleProduct.imageURL}
                alt="Product"
              />
              <h2>{singleProduct.name}({singleProduct.price})</h2>
              
              <p>{singleProduct.description}</p>
              { (userName) ? 
              <div>
              <select onChange={(event) => setSingleQuantity(event.target.value)}>
                {quantityArray.map((singleQuantity) => (
                  <option key={singleQuantity} value={singleQuantity}>
                    {singleQuantity}
                  </option>
                ))}
              </select>
              <button key={singleProduct.id} onClick={() => addProducttoCart(singleProduct)}>
                Add To Cart
              </button>
              <h2>{singleProductMessage}</h2>
            </div> : null}
            </div>
            <button className='message' onClick={() => history.push("/products")}>Back To Meals</button>
            </>
          );
    }
    else {
        return <>
            <div>Product Not Found</div>
        </>
    }
}

export default SingleProduct;