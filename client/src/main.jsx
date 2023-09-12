import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";
import Dashboard from "./components/Dashboard";
// import App2 from "./components/App2";
import { Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isAuthenticated = (authenticated) => {
  console.log("Authenticated:", authenticated);
  return authenticated;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/login" element={<Login authCheck={isAuthenticated}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard  authCheck={isAuthenticated}/> : (<Navigate to="/login" replace />) }/>

        {/* <Route path="/dashboard" element={<Dashboard authCheck={isAuthenticated}/>} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
