import React from 'react';
import { Navigate } from 'react-router-dom';

type PRProps = {
    children: React.ReactNode;
  };

const ProtectedRoute: React.FC<PRProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated === 'true') {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  };
};

export default ProtectedRoute;