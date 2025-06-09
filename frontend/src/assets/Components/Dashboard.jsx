import { useNavigate } from 'react-router-dom'


// Dashboard component for displaying user stats and auctions

function Dashboard() {
  const navigate = useNavigate()

  // Example stats and auctions for demo purposes
  const stats = [
    { label: 'Active Auctions', value: 5 },
    { label: 'Your Bids', value: 12 },
    { label: 'Auctions Won', value: 2 },
  ]

  const auctions = [
    { id: 1, title: 'Vintage Watch', status: 'Live', highestBid: '$120' },
    { id: 2, title: 'Antique Vase', status: 'Ended', highestBid: '$340' },
    { id: 3, title: 'Rare Book', status: 'Live', highestBid: '$80' },
  ]

  const handleLogout = () => {
    // Here you can clear any auth state if needed
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Dashboard</h1>
        
        {/* Stats */}
        <div className="flex justify-around mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-green-600">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Auctions Table */}
        <h2 className="text-xl font-semibold mb-4 text-green-700">Your Auctions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Highest Bid</th>
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => (
                <tr key={auction.id}>
                  <td className="px-4 py-2 border-b">{auction.title}</td>
                  <td className="px-4 py-2 border-b">{auction.status}</td>
                  <td className="px-4 py-2 border-b">{auction.highestBid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard