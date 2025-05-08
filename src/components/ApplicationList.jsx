import {useEffect, useState} from 'react'
import api from '../services/api'
import ApplicationCard from './ApplicationCard'
import ApplicationForm from './ApplicationForm'

export default ApplicationList(){
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (loading) return <p className = "p-4">Loading...</p>
    if (error) return <p className = "p-4 text-red-500">{error}</p>

    return(
        <div className="p-4 space-y-6">
        {/* Application Form */}
        <ApplicationForm onAdd={(newApp) => setApplications(prev => [...prev, newApp])} />
  
        {/* Job Application Cards */}
        <div className="grid gap-4">
          {applications.length > 0 ? (
            applications.map(app => (
              <ApplicationCard
                key={app._id}
                application={app}
                onDelete={handleDelete}
                onUpdate={(updatedApp) =>
                    setApplications(apps =>
                      apps.map(a => (a._id === updatedApp._id ? updatedApp : a))
                    )
                  }
              />
            ))
          ) : (
            <p className="text-gray-600">No applications found.</p>
          )}
        </div>
      </div>
    )
}