import React, {useState} from "react";

const LoginForm = ({onLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const userData = await response.json();
            onLogin(userData);
        }
        else {
            console.error('Authentication failed');
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
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;