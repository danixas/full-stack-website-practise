import React from "react";
import Timer from "../utils/Timer"

const Home = () => {
    return (
        <div>
            <h1><b>HOME PAGE | authenticated users only</b></h1>
            <Timer/>
        </div>
        
    );
};

export default Home;