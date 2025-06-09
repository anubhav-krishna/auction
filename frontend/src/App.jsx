import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import About from './assets/Components/About'
import Contact from './assets/Components/Contact.jsx'
import Dashboard from './assets/Components/Dashboard.jsx'
import Home from './assets/Components/Home.jsx'
import Leaderboard from './assets/Components/Leaderboard.jsx'
import Login from './assets/Components/Login.jsx'
import Profile from './assets/Components/Profile.jsx'
import Register from './assets/Components/Register.jsx'
import Sidebar from './assets/Components/Sidebar.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => setIsLoggedIn(false)
  const handleLogin = () => setIsLoggedIn(true)

  return (
    <Router>
      <Sidebar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="ml-64"> {/* Add margin to account for sidebar */}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
