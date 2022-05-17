import React from "react";
const Account = ({user}) => {
   return <>
        <div className="account">
        <h1>Your Meals-And-Deals Account Information:</h1>
        <br/>
        <h2>Username: {user.username}</h2>
        <h2>First Name: {user.firstname} <br/> Last Name: {user.lastname}</h2>
        <h2>Email: {user.email}</h2>
        </div>
    </>;
};

export default Account