import { user } from "pg/lib/defaults";
import React, { useState } from "react";
import { callApi } from "../axios-services";

const AddUser = ({ user, token }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [newUserMessage, setNewUserMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userResp = await callApi({
      url: `/users/register`,
      method: "POST",
      token,
      body: {
        firstName,
        lastName,
        email,
        username,
        password,
        isAdmin,
      },
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setIsAdmin("");
    if (userResp.user)
      setNewUserMessage(`New User ${userResp.user.username} Created`);
  };

  return (
    <>
      <div className='adduser'>
        {user.isAdmin ? (
          <>
            <h1>{newUserMessage}</h1>
            <h1>Add a New User</h1>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Firstname'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>{" "}
              <br />
              <input
                type='text'
                placeholder='Lastname'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>{" "}
              <br />
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>{" "}
              <br />
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>{" "}
              <br />
              <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>{" "}
              <br />
              <input
                type='text'
                placeholder='Make Admin'
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></input>
              <br />
              <button type='Submit'>Submit</button>
            </form>
          </>
        ) : (
          <p>Meals and Deals</p>
        )}
      </div>
    </>
  );
};

export default AddUser;
