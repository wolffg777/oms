import { useState } from 'react'
import { useCreateJob } from '../hooks/useJobs'

const EMPTY_FORM = {
  wse: '', schoolName: '', qntrlId: '',
  missiveId: '', paId: '', amId: '', edd: '', notes: ''
}

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}

const labelStyle = {
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#374151'
}

const inputStyle = {
  padding: '8px 10px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '0.9rem',
  outline: 'none'
}

export default function CreateJobForm({ onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const createJob = useCreateJob()

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await createJob.mutateAsync(form)
      onClose()
    } catch (err) {
      console.error('Failed to create job:', err)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '2rem', width: '100%', maxWidth: '520px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>
          New Job
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { name: 'wse',        label: 'WSE' },
              { name: 'schoolName', label: 'School Name' },
              { name: 'qntrlId',   label: 'Qntrl ID' },
              { name: 'missiveId', label: 'Missive ID' },
              { name: 'paId',      label: 'PA ID' },
              { name: 'amId',      label: 'AM ID' },
              { name: 'edd',       label: 'EDD' },
            ].map(({ name, label }) => (
              <div key={name} style={fieldStyle}>
                <label style={labelStyle}>{label}</label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required={name !== 'notes'}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} style={{
              padding: '8px 18px', borderRadius: '6px',
              border: '1px solid #d1d5db', background: 'white',
              cursor: 'pointer', fontSize: '0.9rem'
            }}>
              Cancel
            </button>
            <button type="submit" disabled={createJob.isPending} style={{
              padding: '8px 18px', borderRadius: '6px',
              border: 'none', background: '#2563eb', color: 'white',
              cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600
            }}>
              {createJob.isPending ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}