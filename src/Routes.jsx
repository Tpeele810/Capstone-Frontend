import { Routes, Route, Navigate } from 'react-router-dom';
//import components 
import ApplicationList from './components/ApplicationList';
import Login from './components/Login';
import Register from './components/Register';
import AddApplication from './components/AddApplication';
import ApplicationForm from './components/ApplicationForm';

const RoutesComponent = ({ isAuthenticated, handleLogin, handleAddApplication, applications, refreshApplications }) => {
  return ( //Routes 
    <Routes>
      <Route
        path="/"
        element={<ApplicationList applications = {applications} refreshApplications = {refreshApplications} />}
      />
      <Route
        path = "/login"
        element = {isAuthenticated ? (<Navigate to = "/" replace /> ) : ( <Login onLogin = {handleLogin} />)}
      />
      <Route
        path = "/register"
        element = {isAuthenticated ? <Navigate to = "/" replace /> : <Register />}
      />
      <Route
        path = "/add-application"
        element = {<ApplicationForm onSubmit = {handleAddApplication} />}
      />
    </Routes>
  );
};

export default RoutesComponent;