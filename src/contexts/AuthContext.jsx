import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  useEffect(() => {
    if (token) {
        localStorage.setItem('token', token)
    } else {
        localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    } else {
        localStorage.removeItem('user')
    }
  }, [user]);

  const login = (newToken, newUser) => {
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext