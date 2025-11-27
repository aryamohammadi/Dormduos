import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              DormDuos
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The housing platform made for UC Riverside students. Post your listing, browse listings, and find your next home.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/listings"
                className="bg-white text-slate-800 px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Browse Listings
              </Link>
              
              <Link
                to="/landlord"
                className="border-2 border-white text-white px-8 py-3 rounded font-medium hover:bg-white hover:text-slate-800 transition-colors"
              >
                Post a Listing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Looking for Roommates?</h3>
            <p className="text-gray-600 mb-4">
              Join HighlanderHousing's Discord community to connect with other UCR students looking for roommates.
            </p>
            <a 
              href="https://discord.gg/gqCQDXz4rg" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-slate-800 text-white px-6 py-2 rounded font-medium hover:bg-slate-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord Community
            </a>
            <p className="text-sm text-gray-500 mt-4">
              In partnership with <strong className="text-slate-800">HighlanderHousing</strong>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Place?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Browse available listings or post your property for UCR students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-white text-slate-800 px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors"
            >
              View Listings
            </Link>
            <Link
              to="/landlord"
              className="border-2 border-white text-white px-8 py-3 rounded font-medium hover:bg-white hover:text-slate-800 transition-colors"
            >
              Post a Listing
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-amber-900 text-sm leading-relaxed">
              <strong>Important:</strong> Listings are posted by individuals and are not verified, endorsed, or guaranteed by this platform. Please exercise caution and verify all information independently before making any commitments.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home