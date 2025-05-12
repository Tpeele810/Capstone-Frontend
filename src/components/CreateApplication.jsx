

export default function CreateApplication() {
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

    
    return (
    <div>CreateApplication</div>
  )
}
