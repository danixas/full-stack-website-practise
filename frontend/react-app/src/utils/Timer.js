import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Counter = () => {
    const [lastLogin, setLastLogin] = useState();
    const [diffInSeconds, setDiffInSeconds] = useState();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [cookies] = useCookies(["token"]);
    // get the last login time from the backend
    useEffect(() => {
        const getTime = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/time', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies.token}`,
                        'Access-Control-Allow-Origin': true
                    },
                    credentials: 'include'
                });
                if (response.ok)
                {
                    const data = await response.json();
                    setLastLogin(data.lastLogin);
                }
                else {
                    console.error("timer response not okay")
                }
            }
            catch (error) {
                console.log("error getting the time: ", error)
            };
        };
        getTime();
    }, [cookies]);
   
    useEffect(() => {

        const updateDifference = () => {
            const currentDate = new Date();
            const lastLoginDate = new Date(lastLogin);
    
            const differenceInMilliseconds = Math.abs(currentDate - lastLoginDate);
            const differenceInSeconds = Math.floor(differenceInMilliseconds/1000);
            setDiffInSeconds(differenceInSeconds);
            const hours = Math.floor(diffInSeconds/3600);
            const minutes = Math.floor((diffInSeconds - hours * 3600)/60);
            const seconds = diffInSeconds - hours*3600 - minutes*60;
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        };
        updateDifference();

        const intervalId = setInterval(updateDifference, 1000);
        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [lastLogin, diffInSeconds]);
    

    return (
        <div className="welcome-container">
            <h1>SESSION TIME: {hours !== 0? <>{hours} h </>:<></>}
                {minutes !== 0? <>{minutes} min </>:<></>}
                <>{seconds} s</>
            </h1>
        </div>
    );
};

export default Counter;