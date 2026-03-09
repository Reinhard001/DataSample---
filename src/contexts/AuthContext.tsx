import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const parseUsers = (): Array<{ id: string; name: string; email: string; password: string }> => {
    const rawUsers = localStorage.getItem('users')
    if (!rawUsers) {
      return []
    }

    try {
      const parsedUsers = JSON.parse(rawUsers)
      return Array.isArray(parsedUsers) ? parsedUsers : []
    } catch {
      localStorage.removeItem('users')
      return []
    }
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser)
        } else {
          localStorage.removeItem('user')
        }
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if user exists in localStorage
    const users = parseUsers()
    const foundUser = users.find((u: any) => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if user already exists
    const users = parseUsers()
    if (users.find((u: any) => u.email === email)) {
      return false // User already exists
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
