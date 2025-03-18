'use client'

import { useState } from 'react'

export default function SearchBar({ className = '' }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd redirect to a search results page or filter the current page
    console.log('Searching for:', searchTerm)
  }
  
  return (
    <form onSubmit={handleSubmit} className={`flex ${className}`}>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-r hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}