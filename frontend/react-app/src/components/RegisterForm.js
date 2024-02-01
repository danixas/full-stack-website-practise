import React, {useState} from "react";

const RegisterForm = ({onRegister}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (response.ok) {
                const userData = await response.json();
                onRegister(userData);
            }
            else {
                console.error('Registration failed');
            }

        }
        catch (error) {
            console.error('Error during fetch:', error);
        }
        

    };

    return (
        <form onSubmit={handleRegister}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button className="submit-button" type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;