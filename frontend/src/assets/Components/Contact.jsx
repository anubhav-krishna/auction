
function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Contact Us</h1>
        <p className="mb-4 text-gray-700">Have questions or need support? Reach out to us!</p>
        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Contact Information:</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Email: <a href="mailto:support@auctionapp.com" className="text-green-500 underline">support@auctionapp.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-green-500 underline">+1 234 567 890</a></li>
            <li>Address: 123 Auction St, Bid City, Country</li>
          </ul>
        </div>
        <div className="text-left">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Send us a message:</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
            <input type="email" placeholder="Your Email" className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
            <textarea placeholder="Your Message" className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" rows={4}></textarea>
            <button type="submit" className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact