
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to the Auction App</h1>
        <p className="mb-6 text-gray-700">Please login or register to continue using the sidebar.</p>
        {/* add several detail about auction site */}
        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold text-blue-600">Features:</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Bid on exciting auctions</li>
            <li>Create and manage your own auctions</li>
            <li>View auction history and leaderboard</li>
            <li>Contact support for any queries</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home