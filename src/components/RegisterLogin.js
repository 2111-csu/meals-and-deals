import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import { callApi } from "../axios-services";

const RegisterLogin = ({
  setToken,
  setUserName,
  setUserId,
  setUser,
  setCart,
  token,
  setOrderId
}) => {
  const [firstName, setFirstName] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verPass, setVerPass] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const history = useHistory();
  
  return (
    <>
      <div className="form-container">
        <div className="login-header">
          {params.method === "register" ? (
            <h3 className="header">Register a New Account</h3>
          ) : (
            <h3 className="header">Login To Your Account</h3>
          )}
        </div>
        <form
          className="login-form"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await callApi({
                url: `/users/${params.method}`,
                method: "POST",
                body: { firstName, lastName, email, username, password },
              });
              
              if(!response) {
                if (params.method === 'login') setLoginMessage('Incorrect Credentials') 
                if (params.method === 'register') setLoginMessage('Failed To Register')
              }
              if (response.error) {
                setError(response.error);
              }
              if (response.token) {
                const { token } = response;
                const { user } = response;
                setToken(token);
                setUser(user);
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                if (user) {
                  setUserName(user.username);
                  localStorage.setItem("username", user.username);
                  setUserId(user.id);
                  localStorage.setItem("userId", user.id);
                  setUsername("");
                  setPassword("");
                  setOrderId('')
                  history.push("/");
                }
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {params.method === "register" ? (
            <>
              <fieldset className="input-fieldset">
                <label>First Name </label>
                <br/>
                <input
                  className="input-field"
                  type="text"
                  name="First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </fieldset>
              <fieldset className="input-fieldset">
                <label>Last Name </label>
                <br/>
                <input
                  className="input-field"
                  type="text"
                  name="Last Name"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </fieldset>
              <fieldset className="input-fieldset">
                <label>Email </label>
                <br/>
                <input
                  className="input-field"
                  type="text"
                  name="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </fieldset>
            </>
          ) : null}
          <fieldset className="input-fieldset">
            <label>Username </label>
            <br/>
            <input
              className="input-field"
              type="text"
              name="Login Name"
              onChange={(event) => setUsername(event.target.value)}
            />
          </fieldset>

          <fieldset className="input-fieldset">
            <label>Password </label>
            <br/>
            <input
              className="input-field"
              type="password"
              name="Password"
              placeholder=" (min length 8 chars)"
              onChange={(event) => setPassword(event.target.value)}
            />
          </fieldset>

          {params.method === "register" ? (
            <fieldset className="input-fieldset">
              <br/>
              <label>Verify Password</label>
              <br/>
              <input
                className="input-field"
                type="password"
                name="Verify Password"
                placeholder=" (re-enter your password)"
                onChange={(event) => setVerPass(event.target.value)}
              />
            </fieldset>
          ) : null}
          {(params.method === "register" && loginMessage === 'Failed To Register') || (params.method === "login" && loginMessage === 'Incorrect Credentials')  ? <h1>{loginMessage}</h1> : null}
          {params.method === "register" ? (
            <button
              className="login-button"
              type="submit"
              disabled={
                !password ||
                !username ||
                password.length < 8 ||
                password !== verPass
              }
            >
              Register
            </button>
          ) : (
            <button
              className="login-button"
              type="submit"
              disabled={!password || !username}
            >
              Login
            </button>
          )}
          {params.method === "register" && password !== verPass && (
            <span className="password-alert">Passwords must match!</span>
          )}
          {params.method === "register" && (username === '' || email === ''||lastName === ''||firstName === '' ) && (
            <span className="password-alert">All Fields Required!</span>
          )}

          {params.method === "register" && password.length < 8 && (
            <span className="password-alert">
              (Passwords must contain at least 8 characters)
            </span>
          )}

          {error ? <span>{error}</span> : null}
          <hr></hr>
          {params.method === "register" ? (
            <>
              <span>Already have an account? </span>
              <Link to="/account/login" className="login-link">
                Click here to log in!
              </Link>
            </>
          ) : (
            <>
              <hr></hr>
              <span>Don't have an account? </span>
              <Link to="/account/register" className="login-link">
                Click here to register!
              </Link>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default RegisterLogin;
