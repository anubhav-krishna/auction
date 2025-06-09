import { Link, useLocation, useNavigate } from 'react-router-dom'

function Sidebar({ isLoggedIn, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (onLogout) onLogout()
    navigate('/')
  }

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-700">Auction App</h1>
      </div>
      <nav className="flex-1 flex flex-col gap-2 p-4">
        <Link
          to="/"
          className={`py-2 px-4 rounded hover:bg-blue-100 transition ${location.pathname === '/' ? 'bg-blue-100 font-semibold' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/leaderboard"
          className={`py-2 px-4 rounded hover:bg-blue-100 transition ${location.pathname === '/leaderboard' ? 'bg-blue-100 font-semibold' : ''}`}
        >
          Auction Leaderboard
        </Link>
        <Link
          to="/about"
          className={`py-2 px-4 rounded hover:bg-blue-100 transition ${location.pathname === '/about' ? 'bg-blue-100 font-semibold' : ''}`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`py-2 px-4 rounded hover:bg-blue-100 transition ${location.pathname === '/contact' ? 'bg-blue-100 font-semibold' : ''}`}
        >
          Contact Us
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className={`py-2 px-4 rounded hover:bg-blue-100 transition ${location.pathname === '/profile' ? 'bg-blue-100 font-semibold' : ''}`}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 transition mt-4"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to="/login"
              className={`py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-center ${location.pathname === '/login' ? 'ring-2 ring-blue-400' : ''}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`py-2 px-4 rounded bg-green-600 text-white hover:bg-green-700 transition text-center ${location.pathname === '/register' ? 'ring-2 ring-green-400' : ''}`}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Sidebar