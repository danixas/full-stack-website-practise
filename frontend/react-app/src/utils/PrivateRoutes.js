import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoutes = () => {
    const [cookies] = useCookies(["token"]);
    const [tokenState, setTokenState] = useState(null);
  
    useEffect(() => {
      const validateToken = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${cookies.token}`,
            },
          });
  
          setTokenState(response.ok);
        } catch (error) {
          console.error('Validation failed', error);
          setTokenState(false);
        }
      };
      if (cookies.token) {
        validateToken();
      }
      else {
        setTokenState(false);
      }
      
    }, [cookies.token]);
  
    if (tokenState === null) {
      // Loading state, you might want to render a loading indicator
      return null;
    }
  
    return tokenState ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;