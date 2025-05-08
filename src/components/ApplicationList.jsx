import {useEffect, useState} from 'react'
import api from '../services/api'
import ApplicationCard from './ApplicationCard'
import ApplicationForm from './ApplicationForm'


export default function ApplicationList() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [statusFilter, setStatusFilter] = useState('All');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(()=>{
        const fetchApplications = async () => {
            try{
                const response = await api.get('/applications')
                setApplications(response.data)
            }catch(err){
                console.log('Error fetching applications', err)
            }finally{
                setLoading(false)
            }
        }
fetchApplications()
    },[])

    const handleDelete = (id) => {
        setApplications(apps => apps.filter(app => app._id !== id));
      };


      const handleUpdate = (updatedApp) => {
        setApplications(apps =>
          apps.map(app => (app._id === updatedApp._id ? updatedApp : app))
        );
      };
    
      const filteredApps = applications
        .filter(app => statusFilter === 'All' || app.status === statusFilter)
        .sort((a, b) => {
          const aField = a[sortField]?.toLowerCase?.() ?? a[sortField];
          const bField = b[sortField]?.toLowerCase?.() ?? b[sortField];
    
          if (aField < bField) return sortDirection === 'asc' ? -1 : 1;
          if (aField > bField) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      
    if (loading) return <p className = "p-4">Loading...</p>
    if (error) return <p className = "p-4 text-red-500">{error}</p>

    return (
        <div className = "p-4 space-y-6">
        <ApplicationForm onAdd = {(newApp) => setApplications(prev => [...prev, newApp])} />
  
        {/* 🔽 Filter + Sort Controls */}
        <div className = "flex flex-wrap items-center gap-4">
          <select
            value = {statusFilter}
            onChange = {(e) => setStatusFilter(e.target.value)}
            className = "p-2 border rounded"
          >
            <option value = "All">All Statuses</option>
            <option value = "Applied">Applied</option>
            <option value = "Interviewing">Interviewing</option>
            <option value = "Offer">Offer</option>
            <option value = "Rejected">Rejected</option>
          </select>
  
          <select
            value = {sortField}
            onChange = {(e) => setSortField(e.target.value)}
            className = "p-2 border rounded"
          >
            <option value = "createdAt">Sort by Date</option>
            <option value = "company">Sort by Company</option>
            <option value = "position">Sort by Position</option>
          </select>
  
          <select
            value = {sortDirection}
            onChange = {(e) => setSortDirection(e.target.value)}
            className = "p-2 border rounded"
          >
            <option value = "desc">Descending</option>
            <option value = "asc">Ascending</option>
          </select>
        </div>
  
        {/* Application Cards */}
        <div className = "grid gap-4">
          {filteredApps.length > 0 ? (
            filteredApps.map(app => (
              <ApplicationCard
                key = {app._id}
                application = {app}
                onDelete = {handleDelete}
                onUpdate = {handleUpdate}
              />
            ))
          ) : (
            <p className = "text-gray-600">No applications match your filters.</p>
          )}
        </div>
      </div>
  )
}
