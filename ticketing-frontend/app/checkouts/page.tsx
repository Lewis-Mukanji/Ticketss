'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Checkout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventId')
  const quantity = searchParams.get('quantity') || '1'
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // In a real app, you'd fetch this data from your Laravel API
  const event = {
    id: eventId,
    title: 'Event Title',
    price: 59.99
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // In a real app, you'd send this data to your Laravel API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to success page
      router.push(`/checkout/success?orderId=123456`)
    } catch (error) {
      console.error('Payment failed:', error)
      setIsLoading(false)
    }
  }

  const totalPrice = parseFloat(quantity) * event.price

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <p className="font-medium">{event.title}</p>
            <p className="text-gray-600 mb-2">Quantity: {quantity}</p>
            <p className="text-gray-600 mb-4">Price per ticket: ${event.price}</p>
            <div className="border-t pt-4 mt-4">
              <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
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
              <label className="block mb-1 font-medium">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Card Number</label>
              <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Expiry Date</label>
                <input 
                  type="text" 
                  value={expiryDate} 
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">CVV</label>
                <input 
                  type="text" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}