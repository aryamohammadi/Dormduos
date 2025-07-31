import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 text-gray-900">
        
        
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Platform Badge */}
            <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mb-8">
              <span className="text-sm font-medium text-blue-800">🏠 Housing & Roommate Platform</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Find Housing & Connect with Roommates
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              A community platform for housing listings near UC Riverside. Browse available properties and connect with landlords.
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium text-green-800">✨ Roommate Search Feature Coming Soon!</span>
            </div>

            {/* Discord Redirect for Roommate Search */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-purple-800 text-sm mb-3">
                🎯 <strong>Looking for roommates right now?</strong> Join HighlanderHousing's Discord community!
              </p>
              <a 
                href="https://discord.gg/gqCQDXz4rg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Community
              </a>
              <p className="text-xs text-purple-600 mt-2">
                Roommate feature will be added to this website soon!
              </p>
            </div>

            {/* Partnership Info */}
            <p className="text-sm text-gray-500 mb-8">
              In partnership with <strong className="text-blue-600">HighlanderHousing</strong>
            </p>
            
            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-12 max-w-2xl mx-auto">
              <p className="text-yellow-800 text-sm">
                ⚠️ <strong>Important:</strong> Listings are posted by individuals and are not verified, endorsed, or guaranteed by this platform. Please exercise caution and verify all information independently before making any commitments.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/listings"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View Listings
              </Link>
              
              <Link
                to="/landlord"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Post a Listing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple platform for browsing and posting housing listings in the UCR community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Easy Search & Filters</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our advanced search filters. Sort by price, bedrooms, distance from campus, and amenities.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Direct Contact</h3>
              <p className="text-gray-600">
                Connect directly with property owners through the platform. Please exercise due diligence when contacting landlords.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Instant Connect</h3>
              <p className="text-gray-600">
                Connect directly with landlords through our platform. Get quick responses and schedule viewings effortlessly.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Near Campus</h3>
              <p className="text-gray-600">
                All listings are within reasonable distance from UCR campus. Walk, bike, or take a short drive to classes.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Focused</h3>
              <p className="text-gray-600">
                Many listings cater to students, but terms and conditions vary by individual landlord. Always review lease agreements carefully.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Listed Information</h3>
              <p className="text-gray-600">
                View basic pricing and property details as provided by landlords. Always verify all information and terms directly with the property owner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse Housing Listings
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            View available listings or post your own property rental.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <strong>Remember:</strong> This platform facilitates connections between renters and landlords. All agreements, payments, and communications are between you and the property owner. Use caution and verify all details independently.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Listings
            </Link>
            <Link
              to="/landlord"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
            >
              Post a Listing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 