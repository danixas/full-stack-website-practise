import React from "react";
import Logout from "./Logout";

const Navbar = () => {
    return (
        <nav className="navbar">
            <a href="/">SITE NAME</a>
            <ul>
                <Logout/>

                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/register">Register</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;