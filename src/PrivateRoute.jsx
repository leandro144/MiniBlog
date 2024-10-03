import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/context';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('token'); 

  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
