import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              DormDuos
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Find housing for UCR off-campus students. Browse available properties and connect with landlords.
            </p>

            {/* Discord Link */}
            <div className="bg-purple-50 border border-purple-200 rounded p-4 mb-6 max-w-2xl mx-auto">
              <p className="text-purple-800 text-sm mb-3">
                <strong>Looking for roommates?</strong> Join HighlanderHousing's Discord community.
              </p>
              <a 
                href="https://discord.gg/gqCQDXz4rg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Community
              </a>
            </div>

            {/* Partnership Info */}
            <p className="text-sm text-gray-500 mb-8">
              In partnership with <strong className="text-slate-800">HighlanderHousing</strong>
            </p>
            
            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-amber-900 text-sm leading-relaxed">
                <strong>Important:</strong> Listings are posted by individuals and are not verified, endorsed, or guaranteed by this platform. Please exercise caution and verify all information independently before making any commitments.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/listings"
                className="bg-slate-800 text-white px-8 py-3 rounded font-medium hover:bg-slate-900 transition-colors"
              >
                View Listings
              </Link>
              
              <Link
                to="/landlord"
                className="border-2 border-slate-800 text-slate-800 px-8 py-3 rounded font-medium hover:bg-slate-800 hover:text-white transition-colors"
              >
                Post a Listing
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home 