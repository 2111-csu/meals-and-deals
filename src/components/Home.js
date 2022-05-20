import { user } from "pg/lib/defaults";
import React from "react";
import { useHistory, Link } from "react-router-dom";

const Home = ({ userName, message }) => {
    const history = useHistory()
    return <>
        <div>
            {(userName === '') ? <button className='message' onClick={() => history.push("/account/register")}>Sign In To Order</button> : <h2 className='message'>You are Signed in as {userName}</h2>}
            <br />
            <br />
            <h2 className='ordermessage'>{message}</h2>
            <br />
            <img src="images/modern.jpg" className="welcome" alt="welcome to meals-and-deals" />
            <br />
            <img src="images/home.png" className="welcome" alt="welcome to meals-and-deals" />
            <br />
            <img src="images/works.png" className="works" alt="meals-and-deals details" />
            <br />
            <Link to="/products"><img src="images/homepage2.png" className="welcome" alt="image of pasta" /></Link>
            <br />
        </div>
        {!userName ?
            <button className="home-button" onClick={() => history.push("/account/register")}>
                Sign Up Now!
            </button>
            : null}
    </>;
};

export default Home