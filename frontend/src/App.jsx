import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import MyBooks from './components/Mybooks.jsx'
import Addbook from './Admin/Addbook'


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/addbook' element={<Addbook />} />
          <Route path='/mybooks' element={<MyBooks />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
