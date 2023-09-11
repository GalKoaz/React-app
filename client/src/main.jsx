import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";
import Dashboard from "./components/Dashboard";
// import App2 from "./components/App2";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isAuthenticated = () => {
  // Check if the user is authenticated here
  // You might check for a token, session, or any other authentication state
  // Return true if authenticated, otherwise return false
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/app2" element={<App2 />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
