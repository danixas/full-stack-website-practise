import React from "react";
import "../styles/welcome.css";

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>Simple project for React and Flask practise</h1>
            <h2>The features of this app are:</h2>
            <ul>
                <li><b>User Registration:</b> you can register with a unique username</li>
                <li><b>User Login:</b> without logging in you cannot see the Home Page</li>
                <li><b>Home Page:</b> has a timer showing how long you have been logged in, the timer keeps counting until you are logged out</li>
            </ul>
            <br/>
            <br/>
            <p>User info is stored in sqlite user database {"(passwords are hashed with Brycpt)"}</p>
            <p>There are private routes {"(for now only the Home Page)"}, which can only be accessed if you are logged in</p>
        </div>
    );
};

export default Welcome;