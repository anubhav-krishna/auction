
function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-700">About Auction App</h1>
        <p className="mb-4 text-gray-700">
          Auction App is a modern online auction platform where users can bid on exciting items, create their own auctions, and compete for the top spot on the leaderboard. Our mission is to provide a secure, transparent, and engaging auction experience for everyone.
        </p>
        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Real-time bidding and notifications</li>
            <li>Easy auction creation and management</li>
            <li>Comprehensive leaderboard and history</li>
            <li>Dedicated support team</li>
            <li>Secure and user-friendly interface</li>
          </ul>
        </div>
        <p className="text-gray-700">Join us and start your auction journey today!</p>
      </div>
    </div>
  )
}

export default About