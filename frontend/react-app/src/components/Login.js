import React, {useState} from "react";
import LoginForm from "./LoginForm";

const Login = () => {
    const [user, setUser] = useState(null);
    const handleLogin = (userData) => {
        setUser(userData);
    };

    return (
        <div>
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