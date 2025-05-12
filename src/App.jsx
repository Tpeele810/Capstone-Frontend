import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesComponent from './Routes';  // Ensure this import is correct
import api from './services/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      delete api.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto p-4">
        {/* Pass isAuthenticated prop to RoutesComponent */}
        <RoutesComponent isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
      </div>
    </Router>
  );
}
