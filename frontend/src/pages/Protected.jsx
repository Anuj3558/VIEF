import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// ProtectedRoute component to protect the admin route
const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('authToken'); // Get token from cookies

  if (!token) {
    // If there's no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected element
  return element;
};

export default ProtectedRoute;
