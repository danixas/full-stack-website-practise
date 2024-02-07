import React, {useState} from "react";
import LoginForm from "./LoginForm";
import "../styles/login.css"

const Login = () => {
    const [user, setUser] = useState(null);
    const handleLogin = (userData) => {
        setUser(userData);
    };

    return (
        <div className="login-container">
            <h2>Login Form</h2>
            <div>
                {user? (
                    <div>{user.username} logged in</div>
                ) : (
                    <LoginForm onLogin={handleLogin}/>
                )}
            </div>
        </div>
    );
};

export default Login;