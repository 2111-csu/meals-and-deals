import React from "react";

const Home = ({userName, message}) => {
   console.log(message)
    return <>
        <div>
        <h1>Welcome to Meals and Deals!</h1>
        {(userName ==='') ? <h2>You are not Signed in</h2> : <h2>You are Signed in as {userName}</h2>}
        </div>
        <h2>{message}</h2>
    </>;
};

export default Home