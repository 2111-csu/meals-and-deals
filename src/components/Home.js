import { user } from "pg/lib/defaults";
import React from "react";
import { useHistory, Link } from "react-router-dom";

const Home = ({userName, message}) => {
    const history = useHistory()
    return <>
        <div>
            {(userName ==='') ? <h2 className='message'>Sign In To Order</h2> : <h2>You are Signed in as {userName}</h2>}
            <br/>
            <br/>
            <h2 className='ordermessage'>{message}</h2>
            <br/>
        <img src="images/modern.jpg" className="welcome" alt="welcome to meals-and-deals"/>
        <br/>
        <img src="images/home.png" className="welcome" alt="welcome to meals-and-deals"/>
        <br/>
        <img src="images/works.png" className="works" alt="meals-and-deals details"/>
        <br/>
        <Link to="/products"><img src="images/homepage2.png" className="welcome" alt="image of pasta"/></Link>
        <br/>
        </div>
        {!userName ?
        <button className="home-button" onClick={() => history.push("/account/register")}>
            Sign Up Now!
        </button>
        : null}
    </>;
};

export default Home