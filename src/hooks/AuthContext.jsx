import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    return token ? { token, role } : null
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token && role) {
      setUser({ token, role })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
