import React from "react";

const Home = ({userName, message}) => {
   console.log(message)
    return <>
        <div>
            <br/>
            <br/>
        <img src="images/home.png" className="welcome" alt="welcome to meals-and-deals"/>
        {(userName ==='') ? <h2>You are not Signed in</h2> : <h2>You are Signed in as {userName}</h2>}
        </div>
        <h2>{message}</h2>
    </>;
};

export default Home