import React from "react";

const Home = ({userName, message}) => {
   console.log(message)
    return <>
        <div>
            <br/>
            <br/>
            <h2>{message}</h2>
            <br/>
        <img src="images/modern.jpg" className="welcome" alt="welcome to meals-and-deals"/>
        <br/>
        <img src="images/home.png" className="welcome" alt="welcome to meals-and-deals"/>
        <br/>
        <img src="images/works.png" className="works" alt="meals-and-deals details"/>
        <br/>
        <img src="images/homepage2.png" className="welcome" alt="image of pasta"/>
        <br/>
        {(userName ==='') ? <h2>You are not Signed in</h2> : <h2>You are Signed in as {userName}</h2>}
        </div>
        <h2>{message}</h2>
    </>;
};

export default Home