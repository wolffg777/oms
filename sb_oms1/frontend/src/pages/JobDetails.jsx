import Job from "../components/Job"
import { useJobs } from "../hooks/useJobs"
import { useState } from 'react' 
import { useParams } from "react-router-dom";
import { useJob } from "../hooks/useJobs";

function JobDetails() {
  const { id } = useParams();
  const { data: job, isLoading, error } = useJob(id)

  if (isLoading) return <div>Loading job...</div>
  if (error) return <div>Failed to load job.</div>

  return (
      <div>
      <h1>Job Detail</h1>
      <p>Job ID: {id}</p>
      <h2>Client: {job.client}</h2>
      </div>
  );
}

export default JobDetails