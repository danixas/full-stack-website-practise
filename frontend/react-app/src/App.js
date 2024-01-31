import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Welcome from "./pages/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
