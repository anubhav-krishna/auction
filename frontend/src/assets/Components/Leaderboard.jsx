
function Leaderboard() {
  // Example leaderboard data
  const leaders = [
    { rank: 1, name: 'Alice', auctionsWon: 8, totalBids: 120 },
    { rank: 2, name: 'Bob', auctionsWon: 6, totalBids: 98 },
    { rank: 3, name: 'Charlie', auctionsWon: 5, totalBids: 87 },
    { rank: 4, name: 'Diana', auctionsWon: 4, totalBids: 75 },
    { rank: 5, name: 'Eve', auctionsWon: 3, totalBids: 60 },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Auction Leaderboard</h1>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-green-700">Rank</th>
              <th className="px-4 py-2 border-b text-green-700">Name</th>
              <th className="px-4 py-2 border-b text-green-700">Auctions Won</th>
              <th className="px-4 py-2 border-b text-green-700">Total Bids</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader.rank} className={leader.rank === 1 ? 'bg-green-100 font-bold' : ''}>
                <td className="px-4 py-2 border-b text-center">{leader.rank}</td>
                <td className="px-4 py-2 border-b">{leader.name}</td>
                <td className="px-4 py-2 border-b text-center">{leader.auctionsWon}</td>
                <td className="px-4 py-2 border-b text-center">{leader.totalBids}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard