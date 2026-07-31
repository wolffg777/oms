import { useState } from 'react'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import SkuList from './pages/SkuList'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'

function App() {

  return <>
    <main className="main-content">
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/jobs/:id" element={<JobDetails />} /> */}
        <Route path="/skulist" element={<SkuList />}></Route>
      </Routes>
    </main>
  </>
}

export default App

