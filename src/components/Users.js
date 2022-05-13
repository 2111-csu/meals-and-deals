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
      {console.log("USER in Users", user)}
      {!user.isAdmin === true ? (
        <>
          return (
          <AdminSingleUser />
        </>
      ) : null}

      <>
        <h1> Hello, {userName}</h1>
      </>

      {allUsers.length &&
        allUsers.map((user) => {
          return (
            <div className="singleUser" key={user.id}>
              <h2>
                {user.firstname} {user.lastname}
              </h2>
              <Link to={`/users/${user.id}`}>
                <p>{user.username}</p>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default Users;
