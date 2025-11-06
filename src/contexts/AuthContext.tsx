import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
}

export interface AuthContextType {
  token: string | null
  user: User | null
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER: User = {
  id: '123',
  name: 'John Silva',
  email: 'john.silva@tgx.com.br',
  avatar: 'JS',
  role: 'Senior Developer',
  department: 'Technology'
}

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm_Do28gZGEgU2lsdmEiLCJpYXQiOjE3MzA5MTQ4MDB9.mock-signature-hash'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, senha: string) => {
    console.log('🔐 Logging in...', { email, senha })
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (email && senha) {
      setToken(MOCK_TOKEN)
      setUser(MOCK_USER)
      
      localStorage.setItem('auth_token', MOCK_TOKEN)
      localStorage.setItem('auth_user', JSON.stringify(MOCK_USER))
      
      console.log('✅ Login successful!')
      console.log('📦 Token:', MOCK_TOKEN)
      console.log('👤 User:', MOCK_USER)
    } else {
      throw new Error('Email and password are required')
    }
  }

  const logout = () => {
    console.log('👋 Logging out...')
    setToken(null)
    setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    console.log('✅ Logout successful')
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        login, 
        logout, 
        isAuthenticated: !!token 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
