import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authtoken') // Initial check for token
  );

 useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authtoken');
      
      setIsAuthenticated(!!token); // Update authentication state
    }; 

    // Add a listener for storage changes (optional, useful for logout in another tab)
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth); // Cleanup listener
    };
  }, []);

  // Return the element if authenticated, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
                           