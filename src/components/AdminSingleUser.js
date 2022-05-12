import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getAllUsers } from "../axios-services";

const AdminSingleUser = (user) => {
  const [allUsers, setAllUsers] = useState({});
  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers = await getAllUsers();
      setAllUsers(allUsers);
    };

    fetchAllUsers();
  }, []);
  //   const params = useParams();
  //   const id = params.userId;
  //   const singleUser = users.filter((user) => +user.id === +id);
  //   console.log(singleOrder);
  //   const oneUser = singleUser[0];
  //   if (oneUser) {
  //     return (
  //       <>
  //         {/* {singleOrder.status} {singleOrder.creatorName} {singleOrder.datePlaced} */}
  //         <h2>User is {oneUser.id}</h2>
  //         <p>{/* {doneOrder.status} on {doneOrder.datePlaced} */}</p>
  //       </>
  //     );
  //   } else {
  return (
    <>
      {console.log("All users from Admin page", allUsers)}

      <div>Users Loading...</div>
    </>
  );
  //   }
};

export default AdminSingleUser;
