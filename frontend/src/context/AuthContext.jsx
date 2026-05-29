import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('glamour_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('glamour_user') }
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    const u = { ...userData, token }
    setUser(u)
    localStorage.setItem('glamour_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('glamour_user')
  }

  const updateUser = (data) => {
    const u = { ...user, ...data }
    setUser(u)
    localStorage.setItem('glamour_user', JSON.stringify(u))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
