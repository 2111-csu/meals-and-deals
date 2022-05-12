import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import { callApi } from "../axios-services";

const AdminSingleUser = (user) => {
  const [singleUser, setSingleUser] = useState({});
  const params = useParams();
  const id = params.userId;
  console.log(params);
  console.log("ID", id);
  useEffect(() => {
    const getUserById = async () => {
      const singleUserFromAPI = await callApi({ url: `/users/${id}` });
      setSingleUser(singleUserFromAPI);
    };

    getUserById();
  }, []);
  console.log("SINGLE USER", singleUser);

  if (singleUser) {
    return (
      <>
        {singleUser.firstname} {singleUser.email}
        <h2>User is {singleUser.id}</h2>
        <p>{/* {doneOrder.status} on {doneOrder.datePlaced} */}</p>
      </>
    );
  } else {
    return (
      <>
        {/* {console.log("All users from Admin page", allUsers)} */}

        <div>Users Loading...</div>
      </>
    );
  }
};
export default AdminSingleUser;
