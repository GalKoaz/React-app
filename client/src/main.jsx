import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";
import Dashboard from "./components/Dashboard";
import { Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppContainer = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    // Perform authentication logic here, set authenticated to true if successful
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Perform logout logic here, set authenticated to false
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};


root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);