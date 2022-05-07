import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { callApi } from "../axios-services";

const Users = ({ user, setUser }) => {
  useEffect(() => {
    const getUsers = async () => {
      const users = await callApi({ url: "/users" });
      setUser(users);
    };
    getUsers();
  }, []);

  return (
    <>
      <h1>Users Listings</h1>
      {/* {users.map((user) => {
            return (
                <div className="singleUser" key={user.id}>
                    <Link to={`/users/${user.id}`}><h2>{user.firstname}({user.lastname})</h2></Link>
                    <p>{user.username}</p>
                    <img className="productImage" src={product.imageURL} alt='Product'/>
                </div>
            );
        })} */}
    </>
  );
};

export default Users;
