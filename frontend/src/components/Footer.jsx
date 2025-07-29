import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="text-xl font-bold">UCR Housing</div>
            </div>
            <p className="text-blue-200 max-w-2xl mx-auto">
              A community platform for housing listings near UC Riverside. Users interact directly with property owners.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Important Disclaimer</h3>
            <div className="text-sm text-gray-300 space-y-3 leading-relaxed">
              <p>
                🏫 This site is not affiliated with UC Riverside. This is an independent platform created by a former student for informational purposes only.
              </p>
              <p>
                ⚖️ We are not responsible for any interactions, agreements, or transactions made through this platform. Please exercise due diligence when engaging with landlords.
              </p>
              <p>
                🔒 Always verify property details, landlord credentials, and lease terms independently before making any commitments.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} UCR Housing. A community platform for housing listings.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 