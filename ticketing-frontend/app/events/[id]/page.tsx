import Image from 'next/image'
import { notFound } from 'next/navigation'
import PurchaseTicketForm from '../../components/PurchaseTicketForm'

export default async function EventDetails({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch this data from your Laravel API
  const events = [
    { id: 1, title: 'Summer Music Festival', date: '2025-06-15', image: '/images/lust.jpg', price: 59.99, description: 'A weekend of amazing music performances from top artists.', location: 'Central Park, New York' },
    { id: 2, title: 'Tech Conference 2025', date: '2025-04-22', image: '/images/tech-conf.jpg', price: 149.99, description: 'Learn about the latest technologies and network with industry professionals.', location: 'Convention Center, San Francisco' },
    { id: 3, title: 'Comedy Night', date: '2025-03-30', image: '/images/comedy.jpg', price: 29.99, description: 'An evening of laughter with top comedians from around the country.', location: 'Laugh Factory, Los Angeles' },
  ]

  const event = events.find(e => e.id === parseInt(params.id))
  
  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-[300px] w-full mb-4">
            <Image 
              src={event.image} 
              alt={event.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-gray-600 mb-4">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-gray-600 mb-4">{event.location}</p>
          <p className="mb-6">{event.description}</p>
        </div>
        
        <div>
          <PurchaseTicketForm event={event} />
        </div>
      </div>
    </div>
  )
}