import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">UCR HousingConnect</h1>
            <nav className="space-x-4">
              <button className="text-gray-600 hover:text-gray-900">View Listings</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Post Listing
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Off-Campus Housing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect UCR students with quality housing options
          </p>
          
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Browse Listings
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50">
              I'm a Landlord
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-300 space-y-2">
            <p>This site is not affiliated with UC Riverside.</p>
            <p>Created by a former student for informational purposes only.</p>
            <p>We are not responsible for any interactions or agreements made through this platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App 