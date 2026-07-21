import { useState } from 'react'
import JobListPage from './pages/JobListPage'
import JobDetailPage from './pages/JobDetailPage'

export default function App() {
  //initially: show list, no job selected
  const [selectedJobId, setSelectedJobId] = useState(null)

  //routing: if job valid --> show job, otherwise show job list
  return selectedJobId
    ? <JobDetailPage jobId={selectedJobId} onBack={() => setSelectedJobId(null)} />
    : <JobListPage onSelectJob={setSelectedJobId} />
}