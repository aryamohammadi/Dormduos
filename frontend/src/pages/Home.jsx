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
              <span className="text-sm font-medium text-blue-800">🏠 Community Housing Listings</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              UC Riverside Housing Listings
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A community platform for housing listings near UC Riverside. Browse available properties and connect with landlords.
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