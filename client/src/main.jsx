import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";
import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);