import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";



const UserLogin = ({ }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(localStorage);
      getGuest(result.token);
      deliverMsg(result);
      if (result.token) {
        history.push("/activities");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deliverMsg = (result) => {
    if (result) {
      alert(result.message);
    } else {
      alert(result.error.message);
    }
  };

  const getGuest = async (token) => {
    try {
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await resp.json();
      localStorage.setItem("username", result.username);
      console.log(result.username, "creation of username");
      setGuest(result.username);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 class="welcome">Welcome!</h1>
      <br></br>
      <h3 class="welcome">Login to create activities, routines, and more!</h3>
      <form class="input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br></br>
        <button type="submit">SUBMIT</button>
      </form>
      <br></br>
      <Link to="/users/register">
        <h4 id="register">New? Create an account!</h4>
      </Link>
      <br></br>
    </>
  );
};

export default UserLogin;
