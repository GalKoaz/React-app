import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, authCheck }) => {
  if (authCheck()) {
    // If the user is authenticated, render the provided element.
    return element;
  } else {
    // If the user is not authenticated, redirect to the login page or show a message.
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
