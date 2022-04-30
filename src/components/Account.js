import React from "react";
const Account = ({user}) => {
   console.log(user)
    return <>
        <div>
        <h1>Account Info</h1>
        <h1>{user.username}</h1>
        <h2>{user.firstname} {user.lastname}</h2>
        <h2>{user.email}</h2>
        </div>
    </>;
};

export default Account