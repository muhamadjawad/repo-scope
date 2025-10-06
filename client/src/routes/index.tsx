import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/screens/Register';
import Login from '@/screens/Login';
import Home from '@/screens/Home';
import { useAuth } from '@/context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  console.log('isAuthenticated', isAuthenticated, isLoading, user);
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner component later
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
