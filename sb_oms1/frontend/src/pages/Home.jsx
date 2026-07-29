import Job from "../components/Job"
import { useJobs } from "../hooks/useJobs"
import { useState } from 'react' 

function Home() { 
    const { data: jobs, isLoading, error } = useJobs()

    if (isLoading) return <div>Loading jobs...</div>
    if (error) return <div>Failed to load jobs.</div>

    return <div className="home">
        <div className="useJobs-display">
            {jobs.map((job) => ( 
                <Job job={job} key ={job.id} />
            ))}
        </div>
    </div>
}

export default Home