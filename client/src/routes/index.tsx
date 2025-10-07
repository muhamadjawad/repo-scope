import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/screens/Register';
import Login from '@/screens/Login';
import Home from '@/screens/Home';
import { useAuth } from '@/context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // The initial loading state is still useful to prevent a "flash" of the
  // login page for already authenticated users. We will only show the
  // loader on the initial check, not during login/register attempts.
  const isInitialLoad = isLoading && !isAuthenticated;
  
  if (isInitialLoad) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
