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
  console.log(singleUser);
  if (singleUser) {
    return (
      <>
        <h2>
          User is {singleUser.id} {singleUser.firstname} {singleUser.lastname}
          <br /> email: {singleUser.email}
        </h2>
      </>
    );
  } else {
    return (
      <>
        <div></div>
      </>
    );
  }
};


export default AdminSingleUser;
