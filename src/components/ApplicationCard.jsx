import api from '../services/api';
import {useState} from 'react'

export default function ApplicationCard({ application, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({...application})
    const [error, setError] = useState(null)
  
    const handleChange = (e) =>{
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSave = async () => {
        setError(null)
        try{
            const res = await api.put(`/applications/${application._id}`, formData)
            setIsEditing(false)
            if(onUpdate) onUpdate(res.data)
        }catch (err){
    console.log('Failed to update application', err)}
    }

    const handleCancel = () => {
        setFormData({ ...application });
        setIsEditing(false);
        setError(null);
      };


    const handleDelete = async () => {
    const confirmDelete = window.confirm(`Delete ${application.position} at ${application.company}?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/applications/${application._id}`);
      if (onDelete) onDelete(application._id);
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete. Try again.');
    }
  };

  return (
    <div className = "border p-4 rounded shadow bg-white space-y-2">
      {isEditing ? (
        <>
          <input
            name = "company"
            value = {formData.company}
            onChange = {handleChange}
            className = "w-full p-2 border rounded"
          />
          <input
            name = "position"
            value = {formData.position}
            onChange = {handleChange}
            className = "w-full p-2 border rounded"
          />
          <select
            name = "status"
            value = {formData.status}
            onChange = {handleChange}
            className = "w-full p-2 border rounded"
          >
            <option value = "Applied">Applied</option>
            <option value = "Interviewing">Interviewing</option>
            <option value = "Offer">Offer</option>
            <option value = "Rejected">Rejected</option>
          </select>
          <input
            name = "jobLink"
            value = {formData.jobLink}
            onChange = {handleChange}
            className = "w-full p-2 border rounded"
          />
          <textarea
            name = "notes"
            value = {formData.notes}
            onChange = {handleChange}
            className = "w-full p-2 border rounded"
          />
          {error && <p className = "text-red-500">{error}</p>}

          <div className = "flex gap-2">
            <button
              className = "px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              onClick = {handleSave}
            >
              Save
            </button>
            <button
              className = "px-3 py-1 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick = {handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className = "text-lg font-bold">{application.position}</h2>
          <p className = "text-gray-700">{application.company}</p>
          <p>Status: <span className = "font-semibold">{application.status}</span></p>
          {application.jobLink && (
            <a
              href = {application.jobLink}
              className = "text-blue-500 underline"
              target = "_blank"
              rel = "noopener noreferrer"
            >
              Job Link
            </a>
          )}
          <p className = "text-sm text-gray-600">{application.notes}</p>

          <div className = "flex gap-2 mt-3">
            <button
              className = "px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick = {() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className = "px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              onClick = {handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}