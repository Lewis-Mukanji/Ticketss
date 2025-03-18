'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Event {
  id: number
  title: string
  price: number
}

export default function PurchaseTicketForm({ event }: { event: Event }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/checkout?eventId=${event.id}&quantity=${quantity}`)
  }
  
  const totalPrice = event.price * quantity
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Purchase Tickets</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <p className="text-lg font-bold">${event.price.toFixed(2)} per ticket</p>
        </div>
        
        <div>
          <label htmlFor="quantity" className="block mb-1 font-medium">Quantity</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700"
          >
            Buy Tickets
          </button>
        </div>
      </form>
    </div>
  )
}