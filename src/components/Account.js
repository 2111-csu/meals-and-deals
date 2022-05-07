import React from "react";
<<<<<<< HEAD
const Account = ({ user }) => {
  return (
    <>
      <div>
        <h1>Account Info</h1>
        <h1>{user.username}</h1>
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <h2>{user.email}</h2>
      </div>
    </>
  );
=======
const Account = ({user}) => {
   return <>
        <div>
        <h1>Account Info</h1>
        <h1>{user.username}</h1>
        <h2>{user.firstname} {user.lastname}</h2>
        <h2>{user.email}</h2>
        </div>
    </>;
>>>>>>> 33608343613aac189590ab1685d0ca1d13210d0e
};

export default Account;
