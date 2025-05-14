import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesComponent from './Routes';
import api from './services/api';

export default function App() {
  //setup State
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [applications, setApplications] = useState([]);
  
  //invoke use Navigate
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
     // Send a GET request to the '/applications' endpoint
    const response = await api.get('/applications');

    // If successful, update the 'applications' state with the retrieved data
    setApplications(response.data);
  } catch (err) {
    // If an error occurs, log it to the console
    console.error('Failed to fetch applications:', err);
  }
};

  // React hook that runs whenever the 'token' value changes
useEffect(() => { 
  if (token) {
    // If a token exists, attach it to all future API requests as an Authorization header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Mark the user as authenticated
    setIsAuthenticated(true);

    // Fetch the user's job applications from the backend
    fetchApplications();
  } else {
    // If no token exists, remove the Authorization header from API requests
    delete api.defaults.headers.common['Authorization'];

    // Mark the user as not authenticated
    setIsAuthenticated(false);
  }
}, [token]); // <- Only re-run this effect if 'token' changes

  //handle Login
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  // //handle Application 
  // const handleAddApplication = async (formData) => {
  //   try {
  //     await api.post('/applications', formData);
  //     await fetchApplications();
  //     navigate('/'); // Safe now
  //   } catch (err) {
  //     console.error('Failed to add application:', err);
  //   }
  // };

  return (
    <>
      <Navbar 
        isAuthenticated = {isAuthenticated} 
        onLogout = {handleLogout} />
      <div className = "max-w-4xl mx-auto p-4">
        <RoutesComponent
          isAuthenticated = {isAuthenticated}
          handleLogin = {handleLogin}
          //handleAddApplication = {handleAddApplication}
          //applications = {applications}          
          //refreshApplications = {fetchApplications}
        />
      </div>
    </>
  );
}