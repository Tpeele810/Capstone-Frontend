import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:5000/',
  baseURL: 'https://capstone-backend-1-3fr5.onrender.com/application'
  headers: {'Content-Type': 'application/json'} 
});

export default api;