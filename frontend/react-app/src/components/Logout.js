import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Logout = () => {
    const [cookies, ,removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const handleLogout = async (e) =>{
        try {
        
            const response = await fetch("http://127.0.0.1:5000/logout", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`,
                }
            }
            );
            if(response.ok)
            {
                removeCookie("token");
                navigate("/");
            };
    
        }
        catch (error)
        {
            console.error("Logout failed", error)
        }
    }
    
    return(
        <button className="my-button" onClick={handleLogout}>Logout</button>
    );
};

export default Logout;