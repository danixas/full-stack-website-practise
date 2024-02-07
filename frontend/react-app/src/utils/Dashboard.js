import React from "react";
import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
    const navigate = useNavigate();
    const handleDashboard = () => {
        navigate("/home");
    };

    return (
        <button className="my-button" onClick={handleDashboard}>Home</button>
    );
};

export default Dashboard;