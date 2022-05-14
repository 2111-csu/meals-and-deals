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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await callApi({
      url: "/users",
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

  const reRenderUsers = async () => {
    const updatedUsers = await callApi({ url: `/users`, method: "GET" });
    setUsers(updatedUsers);
    reRenderUsers();
  };

  return (
    <>
      <br />
      <h2>New User Setup</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(event) => setusername(event.target.value)}
        />
        <input
          type='text'
          placeholder='New Product InStock'
          value={inStock}
          onChange={(event) => setInStock(event.target.value)}
        />
        <input
          type='password'
          placeholder='Password (8 charater min)'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type='text'
          placeholder='Make an Admin'
          value={isAdmin}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

// export default AddProduct;

export default { Users, AddProduct };
