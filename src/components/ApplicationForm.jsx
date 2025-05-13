import { useState } from 'react';

export default function ApplicationForm({ onSubmit }) {
  
  //Setup State  
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    jobLink: '',
    notes: '',
  });

  const [error, setError] = useState(null);

 // This function updates the form state as the user types into the input fields
const handleChange = (e) => {
  setFormData(prev => ({
    ...prev, // keep all existing form fields unchanged
    [e.target.name]: e.target.value, // update the field that changed (using the input's "name" attribute)
  }));
}

 // This function handles the form submission when the user adds a new application
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevents the page from refreshing when the form is submitted
  setError(null);     // Clears any existing error messages

  // Simple validation: Check that both "company" and "position" fields are filled
  if (!formData.company || !formData.position) {
    setError('Company and Position are required'); // Show an error if missing
    return; // Stop submission
  }

  try {
    // Call the `onSubmit` function passed in as a prop (typically sends data to backend)
    await onSubmit(formData);

    // If submission is successful, reset the form fields to initial empty values
    setFormData({
      company: '',         // Clear company field
      position: '',        // Clear position field
      status: 'Applied',   // Reset status to default value
      jobLink: '',         // Clear job link field
      notes: '',           // Clear notes field
    });
  } catch (err) {
    // If something goes wrong during submission (like a network or API error)
    console.error('Failed to create application', err);
    setError('Failed to submit. Try again.'); // Show user-friendly error
  }
};


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
  );
}