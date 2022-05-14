import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useState } from "react/cjs/react.production.min";
import { callApi } from "../axios-services";

import { AdminSingleUser } from "./";

const Users = ({ user, setUser, userName }) => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const users = await callApi({ url: "/users" });
      setAllUsers(users);
    };
    getUsers();
  }, []);
  console.log("USERS 17", allUsers);
  return (
    <>
      <h1> Hello, {userName}</h1>

      {console.log("USER in Users", user)}
      {user.isAdmin === true ? (
        <>
          <AdminSingleUser />
        </>
      ) : null}

      {user.isAdmin === true ? (
        allUsers.length &&
        allUsers.map((user) => {
          return (
            <div className='singleUser' key={user.id}>
              <h2>
                {user.firstname} {user.lastname}
              </h2>
              <Link to={`/users/${user.id}`}>
                <p>{user.username}</p>
              </Link>
            </div>
          );
        })
      ) : (
        <p>Hope you're hungry</p>
      )}
    </>
  );
};

const AddUser = ({ token, setUser }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await callApi({
      url: "/products",
      method: "POST",
      token,
      body: { firstName, lastName, email, username, password, isAdmin },
    });
    const usersResp = await callApi({ url: `/users`, method: "GET" });

    setUsers(usersResp);
    setFirstName("");
    setLastName("");
    setEmail("");
    setusername("");
    setPassword("");
    setEmail("");
    setIsAdmin("");
  };

  const reRenderProducts = async () => {
    const allProducts = await callApi({ url: `/products`, method: "GET" });
    setProducts(allProducts);
    reRenderProducts();
  };

  return (
    <>
      <br />
      <h2>Create a new Product for Meals and Deals</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='New Product Name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type='text'
          placeholder='New Product Description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type='text'
          placeholder='New Product Price'
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <input
          type='text'
          placeholder='New Product ImageURL'
          value={imageURL}
          onChange={(event) => setImageURL(event.target.value)}
        />
        <input
          type='text'
          placeholder='New Product InStock'
          value={inStock}
          onChange={(event) => setInStock(event.target.value)}
        />
        <input
          type='text'
          placeholder='New Product Category'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

// export default AddProduct;

export default { Users, AddProduct };
