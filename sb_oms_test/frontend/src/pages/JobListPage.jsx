import { useState } from 'react'
import { useJobs, useDeleteJob } from '../hooks/useJobs'
import StatusBadge from '../components/StatusBadge'
import CreateJobForm from '../components/CreateJobForm'

export default function JobListPage({ onSelectJob }) {
  const { data: jobs, isLoading, error } = useJobs()
  const deleteJob = useDeleteJob()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = jobs?.filter(job =>
    job.schoolName.toLowerCase().includes(search.toLowerCase()) ||
    job.wse.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading jobs...</div>
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Failed to load jobs.</div>

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Jobs</h1>
        <button onClick={() => setShowForm(true)} style={{
          padding: '8px 18px', borderRadius: '6px',
          border: 'none', background: '#2563eb', color: 'white',
          cursor: 'pointer', fontWeight: 600
        }}>
          + New Job
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Search by school or WSE..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px',
          border: '1px solid #d1d5db', borderRadius: '8px',
          fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none'
        }}
      />

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['WSE', 'School', 'PA', 'AM', 'EDD', 'Status', 'Actions'].map(h => (
              // {['WSE', 'School', 'PA', 'AM', 'EDD', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#374151', fontSize: '0.8rem' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                  No jobs found.
                </td>
              </tr>
            ) : (
              filtered.map((job, i) => (
                <tr
                  key={job.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1d4ed8' }}
                      onClick={() => onSelectJob(job.id)}>
                    {job.wse}
                  </td>
                  <td style={{ padding: '14px 16px' }} onClick={() => onSelectJob(job.id)}>
                    {job.schoolName}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#6b7280' }} onClick={() => onSelectJob(job.id)}>
                    {job.paId}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#6b7280' }} onClick={() => onSelectJob(job.id)}>
                    {job.amId}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#6b7280' }} onClick={() => onSelectJob(job.id)}>
                    {job.edd}
                  </td>
                  <td style={{ padding: '14px 16px' }} onClick={() => onSelectJob(job.id)}>
                    <StatusBadge status={job.status} />
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => {
                        if (confirm(`Delete job ${job.wse}?`)) deleteJob.mutate(job.id)
                      }}
                      style={{
                        padding: '4px 10px', borderRadius: '4px',
                        border: '1px solid #fca5a5', background: '#fef2f2',
                        color: '#dc2626', cursor: 'pointer', fontSize: '0.8rem'
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && <CreateJobForm onClose={() => setShowForm(false)} />}
    </div>
  )
}