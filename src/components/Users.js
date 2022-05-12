import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.production.min";
import { callApi } from "../axios-services";

import { AdminSingleUser } from "./";

const Users = ({ user, setUser, userName }) => {
  useEffect(() => {
    const getUsers = async () => {
      const users = await callApi({ url: "/users" });
      setUser(users);
    };
    getUsers();
  }, []);

  return (
    <>
      {console.log("USER in Users", user)}
      {/* <div className="adminUsers" key={usersid}> */}
      {user.isAdmin === true ? (
        <h2>
          return (
          <>
            <div className="adminUsersList">{user.name}</div>
          </>
          );
          <AdminSingleUser>Hi</AdminSingleUser>
        </h2>
      ) : null}
      {/* </div> */}
      {/* <>
         <h1> Hello, {userName}</h1>
        {user.isAdmin === true ? <AdminSingleUser /> : null}
      </> */}
      {/* {users.map((user) => {
    //         return (
    //             <div className="singleUser" key={user.id}>
    //                 <Link to={`/users/${user.id}`}><h2>{user.firstname}({user.lastname})</h2></Link>
    //                 <p>{user.username}</p>
    //                 <img className="productImage" src={product.imageURL} alt='Product'/>
    //             </div>
    //         );
    //     })} */}
    </>
  );
};

export default Users;
