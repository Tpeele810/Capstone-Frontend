import {useState}from 'react'
import api from '../services/api'


export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    jobLink: '',
    notes: '',
  })

  const [error, setError] = useState(null)

  const handleChange = (e) =>{
    setFormData(prev => ({
        ...prev,
        [e.target.name]:e.target.value,
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError(null)

    //Basic validation
    if(!formData.company || !formData.position){
        setError('Company and Position are required')
        return
    }

    try{
        const res = await api.post('/applications', formData)
        if (onAdd) onAdd(res.data)
            setFormData({
                company: '',
                position: '',
                status: 'Applied',
                jobLink: '',
                notes: '',
        })
    }catch (err){
        console.log('Failed to create Application', err)
        setError('Failed to submit. Try again.')
    }
  }
    return (
        <form onSubmit = {handleSubmit} className="space-y-4 p-4 border rounded shadow max-w-md">
        <h2 className = "text-xl font-bold">Add New Job Application</h2>
  
        {error && <p className = "text-red-500">{error}</p>}
  
        <input
          name = "company"
          value = {formData.company}
          onChange = {handleChange}
          placeholder = "Company"
          className = "w-full p-2 border rounded"
        />
        <input
          name = "position"
          value = {formData.position}
          onChange = {handleChange}
          placeholder = "Position"
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
          placeholder = "Job Link (optional)"
          className = "w-full p-2 border rounded"
        />
        <textarea
          name = "notes"
          value = {formData.notes}
          onChange = {handleChange}
          placeholder = "Notes (optional)"
          className = "w-full p-2 border rounded"
        />
  
        <button
          type = "submit"
          className = "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
  )
}
