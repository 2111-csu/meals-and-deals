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
  console.log("USERS 16", user);
  return (
    <>
      {console.log("USER in Users", user)}
      {/* <div className="adminUsers" key={usersid}> */}
      {!user.isAdmin === true ? (
        <h2>
          return (
          <>
            <div className="adminUsersList">{user.name}</div>
          </>
          );
          <AdminSingleUser />
        </h2>
      ) : null}

      {/* </div> */}
      <>
        <h1> Hello, {userName}</h1>
        {/* {user.isAdmin === true ? <AdminSingleUser /> : null} */}
      </>

      {allUsers.length &&
        allUsers.map((user) => {
          return (
            <div className="singleUser" key={user.id}>
              <Link to={`/users/${user.id}`}>
                <h2>
                  {user.firstname}({user.lastname})
                </h2>
              </Link>
              <p>{user.username}</p>
            </div>
          );
        })}
    </>
  );
};

export default Users;
