import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:5000/',
  baseURL: 'https://capstone-backend-9sba.onrender.com',
  headers: {'Content-Type': 'application/json'} 
});

export default api;