import React from "react";
import { useParams } from "react-router-dom";

const SingleProduct = ({ products }) => {
<<<<<<< HEAD
  const params = useParams();
  const id = params.productId;
  const filteredProduct = products.filter((product) => +product.id === +id);
  const singleProduct = filteredProduct[0];
  if (singleProduct) {
    return (
      <>
        <div className="singleProduct" key={singleProduct.id}>
          <h2>
            {singleProduct.name}({singleProduct.price})
          </h2>
          <p>{singleProduct.description}</p>
          <img
            className="productImage"
            src={singleProduct.imageURL}
            alt="Product"
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Product Not Found</div>
      </>
    );
  }
};
=======
    const params = useParams()
    const id = params.productId
    const filteredProduct = products.filter((product) =>  +product.id === +id)
    const singleProduct = filteredProduct[0]
    if(singleProduct) {
        return <>
            <div className="singleProduct" key={singleProduct.id}>
                    <h2>{singleProduct.name}({singleProduct.price})</h2>
                    <p>{singleProduct.description}</p>
                    <img className="productImage" src={singleProduct.imageURL} alt='Product'/>
                    <button>Add to Cart</button>
             </div>
    </>
    }
    else {
        return <>
            <div>Product Not Found</div>
        </>
    }
}
>>>>>>> d9ebd3d1d7c42e9dcb396f08ce2d4bac41947f45

export default SingleProduct;
