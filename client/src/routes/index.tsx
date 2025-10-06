import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '@/screens/Register';
import Login from '@/screens/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
