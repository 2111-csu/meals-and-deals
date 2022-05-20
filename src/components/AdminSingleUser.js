import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

import { callApi } from "../axios-services";

const AdminSingleUser = (token, isAdmin, userId, user, setUser) => {
  const [singleUser, setSingleUser] = useState({});
  const [admin, setAdmin] = useState(true);
  const params = useParams();
  const id = params.userId;
  console.log(params);
  console.log("ID", id);

  // const changeToAdmin = async (e) => {
  //   const resp = await callApi({
  //     url: `/users`,
  //     method: "PATCH",
  //     body: { user: {} },
  //   });
  // };
  const handleChange = async (e) => {
    setAdmin(true)
    console.log('ADMIN', admin)
    try {
      await callApi({
        url: `/users/${id}`,
        method: "PATCH",
        token,
        body: {
          isAdmin: admin
        },
      });

      setSingleUser(isAdmin);
      setAdmin("");
      if (token) {
        alert("Changed User to Admin");
      }
    } catch (error) {
      alert(error);
    }
    console.log("changed user", singleUser);
  };
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
        <div>
          User is {singleUser.id} {singleUser.firstname} {singleUser.lastname}
          <br /> email: {singleUser.email} <br />
          {singleUser.isAdmin ? (
            <h4>
              {singleUser.username} is an admin <br /> set to standard user?
              <input type='checkbox' label='make admin' value='false'></input>
            </h4>
          ) : (
            <>
              make admin:
              <input
                type='checkbox'
                label='make admin'
                value={true}
                onClick={(e) => handleChange(e.target.value)}
              ></input>
            </>
          )}
        </div>
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
