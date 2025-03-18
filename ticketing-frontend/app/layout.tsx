import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TicketYako - Buy Event Tickets Online',
  description: 'Find and purchase tickets for concerts, conferences, festivals and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
            </Link>
            
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="" className="hover:text-blue-600">
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-blue-600">                   
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-blue-600">                  
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main>{children}</main>
        
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">TicketYako</h3>
                <p>Your one-stop solution for event tickets.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/events" className="hover:underline">Browse Events</Link></li>
                  <li><Link href="/about" className="hover:underline">About Us</Link></li>
                  <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-blue-400">Facebook</a>
                  <a href="#" className="hover:text-blue-400">Twitter</a>
                  <a href="#" className="hover:text-blue-400">Instagram</a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-6 text-center">
              <p>&copy; {new Date().getFullYear()} TicketYako. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}