//API Layer, if api url changes, change only here
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const jobsApi = {
  getAll: () => api.get('/api/jobs').then(r => r.data),
  getOne: (id) => api.get(`/api/jobs/${id}`).then(r => r.data),
  create: (data) => api.post('/api/jobs', data).then(r => r.data),
  update: (id, data) => api.put(`/api/jobs/${id}`, data).then(r => r.data),
  updateStatus: (id, status) => api.patch(`/api/jobs/${id}/status`, { status }).then(r => r.data),
  delete: (id) => api.delete(`/api/jobs/${id}`)
}