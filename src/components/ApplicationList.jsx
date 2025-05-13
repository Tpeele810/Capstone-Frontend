import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ApplicationCard from './ApplicationCard';

export default function ApplicationList({ applications, refreshApplications }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      refreshApplications();
    } catch (err) {
      console.error('Delete failed', err);
      setError('Failed to delete application');
    }
  };

  const handleUpdate = async (updatedApp) => {
    try {
      await api.put(`/applications/${updatedApp._id}`, updatedApp);
      refreshApplications();
    } catch (err) {
      console.error('Update failed', err);
      setError('Failed to update application');
    }
  };

  const filteredApps = (applications || [])
    .filter(app => statusFilter === 'All' || app.status === statusFilter)
    .sort((a, b) => {
      const aField = a[sortField]?.toLowerCase?.() ?? a[sortField];
      const bField = b[sortField]?.toLowerCase?.() ?? b[sortField];
      if (aField < bField) return sortDirection === 'asc' ? -1 : 1;
      if (aField > bField) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-4 space-y-6">
      <Link to="/add-application">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add New Application
        </button>
      </Link>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap items-center gap-4">
        {/* Filters and sorting UI */}
      </div>

      <div className="grid gap-4">
        {filteredApps.length > 0 ? (
          filteredApps.map(app => (
            <ApplicationCard
              key={app._id}
              application={app}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-gray-600">No applications match your filters.</p>
        )}
      </div>
    </div>
  );
}