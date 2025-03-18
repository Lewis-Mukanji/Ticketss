'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
 
export default function Dashboard() {
    const [tickets, setTickets] = useState([
      { 
        id: 1, 
        eventId: 1,
        eventTitle: 'Summer Music Festival', 
        eventDate: '2025-06-15', 
        eventImage: '/images/lust.jpg"',
        qrCode: '/images/qr-code-1.png',
        purchaseDate: '2025-03-10'
      },
      { 
        id: 2, 
        eventId: 3,
        eventTitle: 'Comedy Night', 
        eventDate: '2025-03-30', 
        eventImage: '/images/comedy.jpg',
        qrCode: '/images/qr-code-2.png',
        purchaseDate: '2025-03-15'
      }
    ])
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
        
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">You haven't purchased any tickets yet.</p>
            <Link href="/events" className="text-blue-600 hover:underline">
              Browse events
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white shadow-md rounded-lg overflow-hidden border">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="relative h-[160px]">
                    <Image 
                      src={ticket.eventImage} 
                      alt={ticket.eventTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4 md:col-span-1">
                    <h3 className="font-bold text-lg mb-2">{ticket.eventTitle}</h3>
                    <p className="text-gray-600 mb-1">Date: {new Date(ticket.eventDate).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-3">Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                    <Link 
                      href={`/events/${ticket.eventId}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Event Details
                    </Link>
                  </div>
                  
                  <div className="p-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l">
                    <div className="mb-2 relative w-[120px] h-[120px]">
                      <Image 
                        src={ticket.qrCode} 
                        alt="QR Code Ticket" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    <button 
                      onClick={() => window.open(`/api/tickets/${ticket.id}/download`, '_blank')}
                      className="text-blue-600 hover:underline text-sm flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }