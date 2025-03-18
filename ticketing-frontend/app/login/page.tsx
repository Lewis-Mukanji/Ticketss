'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-lg max-w-md w-full">
        <h2 className="text-3 xl font-bold mb-4">Sign up for TicketYako</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email address</label>
            <input type="email" className="w-full p-2 border rounded" required />
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block mb-1 font-medium">First name</label>
              <input type="text" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last name</label>
              <input type="text" className="w-full p-2 border rounded" required />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input type="password" className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone number (Optional)</label>
            <input type="tel" className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700">
            Sign up
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-600 hover:underline">
          Close
        </button>
      </div>
    </div>
  )
}

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Simulating an API call (replace this with actual authentication logic)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      setError('Invalid email or password')
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <p className="mt-4 text-center">
          Don't have an account? 
          <button onClick={() => setIsModalOpen(true)} className="text-blue-600 hover:underline ml-1">
            Register
          </button>
        </p>
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}