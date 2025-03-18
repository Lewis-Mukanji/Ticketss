import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Mock featured events data (will be fetched from API later)
  const featuredEvents = [
    {
      id: 1,
      title: "Fearless Gala",
      date: "August 25, 2025",
      image: "/images/lust.jpg",
      price: 5000,
      location: "Clarence Matheny, Limuru",
    },
    {
      id: 2,
      title: "Lust Stories",
      date: "April 12, 2025",
      image: "/images/lst.jpeg",
      price: 500,
      location: "Destiny Chapel, Funzi Road",
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "August 5, 2025",
      image: "/images/event3.jpg",
      price: 29.99,
      location: "Exhibition Hall, Chicago",
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "August 5, 2025",
      image: "/images/event3.jpg",
      price: 29.99,
      location: "Exhibition Hall, Chicago",
    },
    // {
    //   id: 5,
    //   title: "Food & Wine Expo",
    //   date: "August 5, 2025",
    //   image: "/images/event3.jpg",
    //   price: 29.99,
    //   location: "Exhibition Hall, Chicago",
    // },
    // {
    //   id: 6,
    //   title: "Food & Wine Expo",
    //   date: "August 5, 2025",
    //   image: "/images/event3.jpg",
    //   price: 29.99,
    //   location: "Exhibition Hall, Chicago",
    // },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Dark Stadium Background */}
      <section className="relative h-screen max-h-[600px] bg-black text-white">
        {/* Background Image (stadium) - add your actual image path when available */}
        <div className="absolute inset-0 bg-[url('/images/stadium-background.jpg')] bg-cover bg-center opacity-70">
          {/* Overlay to darken the image */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Navigation Bar */}
        <div className="relative z-10 container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-500 mr-8">TICKETYAKO</h1>
              <nav className="hidden md:flex space-x-8">
                <Link href="/events/category/sports" className="hover:text-gray-300">
                  Home
                </Link>
                <Link href="/events" className="hover:text-gray-300">
                  Events
                </Link>
                <Link href="/events/category/shows" className="hover:text-gray-300">
                  Users
                </Link>
                <Link href="/checkouts" className="hover:text-gray-300">
                  Payments
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span>Ksh.</span>
              <Link href="/support" className="hover:text-gray-300">
                Support
              </Link>
              <Link href="/login" className="hover:text-gray-300">
                Log in
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Let there be live</h2>
          <p className="text-xl md:text-2xl mb-8">Your next best-event ever is here!!</p>

          {/* Search Bar */}
          <div className="w-full max-w-xl bg-white rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-3">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="What do you want to see?"
                className="w-full p-2 text-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Events Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending Events</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span>1 of 4</span>
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md relative transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <div className="bg-gray-300 h-full w-full flex items-center justify-center">
                    <span className="text-gray-500">Event Image</span>
                  </div>
                  {/* Uncomment when you have actual images */}
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    style={{objectFit: 'cover'}} 
                  />
                </div>
                <button className="absolute top-2 right-2 text-white p-1 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.date}</p>
                  <p className="text-gray-800 font-medium">ksh.{event.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Music', 'Sports', 'Tech', 'Arts', 'Food', 'Business', 'Workshops', 'Nightlife'].map((category) => (
            <Link
              key={category}
              href={`/events/category/${category.toLowerCase()}`}
              className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition"
            >
              <h3 className="font-semibold text-lg">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Never Miss an Event</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for updates on new events and special offers.
            </p>
            <form className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}