import React, {useState} from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
    const [user, setUser] = useState(null);
    const handleRegister = (userData) => {
        setUser(userData);
    };
    return (
        <div>
            <h2>Registration Form</h2>
            <div>
                {user? (
                    <div>{user.username} Registered</div>
                ) : (
                    <RegisterForm onRegister={handleRegister}/>
                )}
            </div>
        </div>
    );
};

export default Register;