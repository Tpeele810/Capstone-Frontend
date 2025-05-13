import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesComponent from './Routes';
import api from './services/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications');
      setApplications(response.data);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    }
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      fetchApplications();
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

  const handleAddApplication = async (formData) => {
    try {
      await api.post('/applications', formData);
      await fetchApplications();
      navigate('/'); // Safe now
    } catch (err) {
      console.error('Failed to add application:', err);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto p-4">
        <RoutesComponent
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
          handleAddApplication={handleAddApplication}
          applications={applications}          
          refreshApplications={fetchApplications}
        />
      </div>
    </>
  );
}