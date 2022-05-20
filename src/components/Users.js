import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <div className='users' key={user.id}>
              <h2 className='users'>
                {user.firstname} {user.lastname}
              </h2>
              <Link to={`/users/${user.id}`}>
                <p className='users'>{user.username}</p>
                <p className='users'>{user.email}</p>
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

export default Users