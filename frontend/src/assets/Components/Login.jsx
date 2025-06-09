import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [role, setRole] = useState('bidder')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // For development, just navigate to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Login as</label>
            <div className="flex gap-4 justify-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="bidder"
                  checked={role === 'bidder'}
                  onChange={() => setRole('bidder')}
                  className="mr-2"
                />
                Bidder
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="auctioneer"
                  checked={role === 'auctioneer'}
                  onChange={() => setRole('auctioneer')}
                  className="mr-2"
                />
                Auctioneer
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login