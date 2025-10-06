import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '@/screens/Register';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
