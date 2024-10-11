// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Use the correct `jwt_decode` function
        const currentTime = Date.now() / 1000;
        //console.log('Decoded Token:', decodedToken);

        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token'); // Remove expired token
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false); // Set loading to false after checking the token
  }, []);

  // Show a loading state while checking the authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // `node` is any renderable React element
};

export default ProtectedRoute;
