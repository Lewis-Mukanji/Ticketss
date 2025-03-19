'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

export default function Events() {
  // Mock events data (will be fetched from API later)
  const allEvents = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "June 15, 2025",
      image: "/images/lust.jpg",
      price: 49.99,
      location: "Central Park, New York",
      category: "music"
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "July 10, 2025",
      image: "/images/event2.jpg",
      price: 99.99,
      location: "Convention Center, San Francisco",
      category: "tech"
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "August 5, 2025",
      image: "/images/event3.jpg",
      price: 29.99,
      location: "Exhibition Hall, Chicago",
      category: "food"
    },
    {
      id: 4,
      title: "Basketball Championship",
      date: "September 20, 2025",
      image: "/images/event4.jpg",
      price: 79.99,
      location: "Sports Arena, Los Angeles",
      category: "sports"
    },
    {
      id: 5,
      title: "Art Exhibition",
      date: "October 15, 2025",
      image: "/images/event5.jpg",
      price: 19.99,
      location: "Modern Art Gallery, Boston",
      category: "arts"
    },
    {
      id: 6,
      title: "Business Leadership Summit",
      date: "November 10, 2025",
      image: "/images/event6.jpg",
      price: 149.99,
      location: "Grand Hotel, Miami",
      category: "business"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Filter events based on search term and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort events based on selected sort option
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  const categories = ['music', 'sports', 'tech', 'arts', 'food', 'business'];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="date">Sort by Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  {/* Placeholder for images */}
                  <div className="bg-gray-300 h-full w-full flex items-center justify-center">
                    <span className="text-gray-500">Event Image</span>
                  </div>
                  {/* Uncomment when you have actual images */}
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-1">{event.date}</p>
                  <p className="text-gray-600 mb-3">{event.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${event.price}</span>
                    <Link href={`/events/${event.id}`} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
