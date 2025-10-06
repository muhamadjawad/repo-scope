import AppRoutes from '@/routes';
import './App.css';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  console.log('App');
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
