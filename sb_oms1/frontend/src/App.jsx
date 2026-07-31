import { useState } from 'react'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import SkuList from './pages/SkuList'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import AdjHist from './pages/AdjHist'

function App() {

  return <>
    <main className="main-content">
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />}></Route>
        <Route path="/skulist" element={<SkuList />}></Route>
        <Route path="/adjhist" element={<AdjHist />}></Route>
      </Routes>
    </main>
  </>
}

export default App

