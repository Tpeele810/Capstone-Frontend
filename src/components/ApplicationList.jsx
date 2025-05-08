import {useEffect, useState} from 'react'
import api from '../services/api'
import ApplicationCard from './ApplicationCard'


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

    if (loading) return <p className = "p-4">Loading...</p>
    if (error) return <p className = "p-4 text-red-500">{error}</p>

    return(
        <div className = "grid gap-4 p-4">
        {applications.length > 0 ? ( applications.map(app =>(<ApplicationCard key={app._id} application= {app}/>

        ))):(<p className = "text-gray-600">No application found.</p>

        )}
        </div>
    )
}