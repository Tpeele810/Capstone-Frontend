import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await api.post('/auth/register', formData); // ✅ use state directly
      console.log('Registration success', res.data)
      onRegister(res.data.token);
      navigate('/');
    } catch (err) {
      console.log('Registration error:', err)
      if (err.responose  && err.response.data && err.response.data.error){
        setError(err.response.data.error)}
        else{
          setError('An unexpected error occurred')
        };
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type = "submit" className="w-full p-2 bg-green-600 text-white rounded">
          Register
        </button>
      </form>
    </div>
  );
}