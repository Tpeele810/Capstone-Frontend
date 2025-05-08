import api from '../services/api';

export default function ApplicationCard({ application, onDelete }) {
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
      <h2 className = "text-lg font-bold">{application.position}</h2>
      <p className = "text-gray-700">{application.company}</p>
      <p>Status: <span className="font-semibold">{application.status}</span></p>
      {application.jobLink && (
        <a href = {application.jobLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          Job Link
        </a>
      )}
      <p className = "text-sm text-gray-600">{application.notes}</p>

      <div className = "flex gap-2 mt-3">
        {/* Edit feature will go here */}
        <button
          className = "px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          onClick = {handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}