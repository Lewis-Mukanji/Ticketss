import Image from 'next/image'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  date: string
  image: string
  price: number
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image 
            src={event.image} 
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-3">{new Date(event.date).toLocaleDateString()}</p>
          <p className="font-medium">${event.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}