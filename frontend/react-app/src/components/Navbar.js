import React from "react";
import Logout from "./Logout";
import Dashboard from "../utils/Dashboard";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const [cookies] = useCookies(["token"]);
    return (
        <nav className="navbar">
            <a href="/">SITE NAME</a>
            <ul>
                {cookies.token?
                <>
                <Dashboard/>
                <Logout/>
                </>
                :
                <>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                </>
                }

                
            </ul>
        </nav>
    );
};

export default Navbar;