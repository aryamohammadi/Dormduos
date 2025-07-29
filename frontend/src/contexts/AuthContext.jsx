import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the authentication context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('auth_token')
        const storedUser = localStorage.getItem('auth_user')
        
        if (storedToken && storedUser) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear corrupted data
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Login function
  const login = (userData, authToken) => {
    try {
      setUser(userData)
      setToken(authToken)
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('auth_user', JSON.stringify(userData))
    } catch (error) {
      console.error('Error storing auth data:', error)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!(user && token)
  }

  // Get authorization header for API requests
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    getAuthHeader
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 