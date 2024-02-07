import React, {useState} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginForm = ({onLogin}) => {
    const [, setCookie] = useCookies(["token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        try{
            e.preventDefault();
            // Clear the password field in the state
            setUsername("");
            setPassword("");
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setCookie("token", data.token);
                navigate("/home");
            }
            else {
                console.error("Authentication failed");
            }

        } 
        catch(error)
        {
            console.error("LOGIN error", error);
        }
        
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button className="submit-button" type="submit">Login</button>
        </form>
    );
};

export default LoginForm;