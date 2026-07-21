import { useState } from 'react'
import { useJob, useUpdateJob, useUpdateJobStatus } from '../hooks/useJobs'
import StatusBadge from '../components/StatusBadge'

const STATUSES = [
  'UPDATE_ORDER_ITEMS',
  'REVIEWS_ORDER',
  'SOURCES_PRODUCTS',
  'AWAITING_PAYMENT_CONFIRMATION',
  'COORDINATES_SCHOOL_DELIVERY',
  'LOG_PACKING_SLIP',
  'ALL_PARTIALS_CONFIRMED_DELIVERED'
]

const inputStyle = {
  padding: '8px 10px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '0.9rem',
  width: '100%',
  outline: 'none'
}

export default function JobDetailPage({ jobId, onBack }) {
  const { data: job, isLoading, error } = useJob(jobId)
  const updateJob = useUpdateJob()
  const updateStatus = useUpdateJobStatus()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading...</div>
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Failed to load job.</div>

  function startEditing() {
    setForm({
      wse: job.wse, schoolName: job.schoolName,
      qntrlId: job.qntrlId, missiveId: job.missiveId,
      paId: job.paId, amId: job.amId,
      edd: job.edd, notes: job.notes || ''
    })
    setEditing(true)
  }

  async function handleSave() {
    await updateJob.mutateAsync({ id: job.id, data: form })
    setEditing(false)
  }

  async function handleStatusChange(e) {
    await updateStatus.mutateAsync({ id: job.id, status: e.target.value })
  }

  const fields = [
    { key: 'wse',        label: 'WSE' },
    { key: 'schoolName', label: 'School Name' },
    { key: 'qntrlId',   label: 'Qntrl ID' },
    { key: 'missiveId', label: 'Missive ID' },
    { key: 'paId',      label: 'PA ID' },
    { key: 'amId',      label: 'AM ID' },
    { key: 'edd',       label: 'EDD' },
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '860px', margin: '0 auto' }}>

      {/* Back + header */}
      <button onClick={onBack} style={{
        marginBottom: '1.5rem', background: 'none',
        border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '0.9rem'
      }}>
        ← Back to jobs
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{job.schoolName}</h1>
          <p style={{ color: '#6b7280', marginTop: '2px' }}>{job.wse}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <StatusBadge status={job.status} />
          {!editing && (
            <button onClick={startEditing} style={{
              padding: '7px 16px', borderRadius: '6px',
              border: '1px solid #d1d5db', background: 'white',
              cursor: 'pointer', fontSize: '0.85rem'
            }}>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Status transition */}
      <div style={{
        background: 'white', borderRadius: '10px',
        border: '1px solid #e5e7eb', padding: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
          Transition Status
        </label>
        <select value={job.status} onChange={handleStatusChange} style={{
          ...inputStyle, width: 'auto', minWidth: '260px', cursor: 'pointer'
        }}>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Fields */}
      <div style={{
        background: 'white', borderRadius: '10px',
        border: '1px solid #e5e7eb', padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {fields.map(({ key, label }) => (
            <div key={key}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>
                {label}
              </div>
              {editing ? (
                <input
                  value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  style={inputStyle}
                />
              ) : (
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{job[key]}</div>
              )}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>Notes</div>
          {editing ? (
            <textarea
              value={form.notes}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          ) : (
            <div style={{ fontSize: '0.95rem', color: job.notes ? '#1a1a1a' : '#9ca3af' }}>
              {job.notes || 'No notes.'}
            </div>
          )}
        </div>

        {editing && (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setEditing(false)} style={{
              padding: '7px 16px', borderRadius: '6px',
              border: '1px solid #d1d5db', background: 'white',
              cursor: 'pointer', fontSize: '0.85rem'
            }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={updateJob.isPending} style={{
              padding: '7px 16px', borderRadius: '6px',
              border: 'none', background: '#2563eb', color: 'white',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
            }}>
              {updateJob.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Event history */}
      <div style={{
        background: 'white', borderRadius: '10px',
        border: '1px solid #e5e7eb', padding: '1.5rem'
      }}>
        <h2 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Event History</h2>
        {job.events?.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No events yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {job.events?.map(event => (
              <div key={event.id} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', padding: '0.75rem',
                background: '#f9fafb', borderRadius: '6px'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {event.status.replace(/_/g, ' ')}
                  </div>
                  {event.description && (
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
                      {event.description}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                  {new Date(event.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}