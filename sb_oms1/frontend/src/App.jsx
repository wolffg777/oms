import { useState } from 'react'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import { Routes, Route } from 'react-router-dom'

function App() {

  return <>
    <main className="main-content">
      <Routes> 
        <Route path="/" element={<Home />}></Route>
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </main>
  </>
}

export default App

