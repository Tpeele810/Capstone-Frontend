import { Routes, Route, Navigate } from 'react-router-dom';
import ApplicationList from './components/ApplicationList';
import Login from './components/Login';
import Register from './components/Register';
import AddApplication from './components/AddApplication';
import ApplicationForm from './components/ApplicationForm';

const RoutesComponent = ({ isAuthenticated, handleLogin }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <ApplicationList /> : <Navigate to="/login" replace />}
      />
       <Route 
       path="/login"
        element={isAuthenticated ? (<Navigate to="/" replace />) : ( <Login onLogin={handleLogin} /> )
        }
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/add-application"
        element={isAuthenticated ? <ApplicationForm /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default RoutesComponent;