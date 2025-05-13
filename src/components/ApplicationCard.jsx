import api from '../services/api';
import {useState} from 'react'

export default function ApplicationCard({ application, onDelete, onUpdate }) {
    
  //Setup State
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({...application})
    const [error, setError] = useState(null)
  
    // This function updates the form state as the user types into the input fields
const handleChange = (e) => {
  setFormData(prev => ({
    ...prev, // keep all existing form fields unchanged
    [e.target.name]: e.target.value, // update the field that changed (using the input's "name" attribute)
  }));
}

// This function is triggered when the user saves their edits to an application
const handleSave = async () => {
  setError(null); // clear any existing error messages
  try {
    // Send a PUT request to update the application on the backend
    const res = await api.put(`/applications/${application._id}`, formData);
    
    // Exit edit mode after successful save
    setIsEditing(false);
    
    // If an update callback exists (passed in from the parent), call it with the updated data
    if (onUpdate) onUpdate(res.data);
  } catch (err) {
    // Log the error if something goes wrong
    console.log('Failed to update application', err);
  }
}

// This function resets the form back to the original application data and exits edit mode
const handleCancel = () => {
  setFormData({ ...application }); // reset formData to original application data
  setIsEditing(false);             // exit edit mode
  setError(null);                  // clear any existing errors
}

// This function deletes the current application after confirming with the user
const handleDelete = async () => {
  // Show a confirmation dialog before deleting
  const confirmDelete = window.confirm(`Delete ${application.position} at ${application.company}?`);
  if (!confirmDelete) return; // exit if user cancels

  try {
    // Send a DELETE request to remove the application
    await api.delete(`/applications/${application._id}`);
    
    // If a delete callback exists (from the parent), call it with the deleted ID
    if (onDelete) onDelete(application._id);
  } catch (err) {
    // Show error if the delete fails
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