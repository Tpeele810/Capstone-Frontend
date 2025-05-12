import { useNavigate } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import api from '../services/api';

export default function AddApplication() {
  const navigate = useNavigate();

  const handleAddApplication = async (formData) => {
    try {
      const res = await api.post('/applications', formData);
      navigate('/'); // Redirect to the list page after adding
    } catch (err) {
      console.log('Error adding application:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Application</h2>
      <ApplicationForm onSubmit={handleAddApplication} />
    </div>
  );
}