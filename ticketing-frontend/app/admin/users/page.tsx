"use client";
import { useState } from "react";
import {
  LucideLayoutDashboard,
  LucideDollarSign,
  LucideTicket,
  LucideUsers,
  LucideCalendar,
  LucideSettings,
  LucideBarChart,
  LucidePlus,
  LucideEdit,
  LucideTrash2,
  LucideChevronRight,
  LucideUserPlus,
  LucideSearch,
  LucideFilter,
  LucideMoon,
  LucideSun,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [events, setEvents] = useState([
    { 
      id: 1, 
      name: "Fearless Gala", 
      revenue: 100000, 
      ticketsSold: 400,
      date: "2024-04-15",
      venue: "Grand Ballroom",
      status: "Active",
      categories: [
        { name: "VIP", price: 5000, available: 50 },
        { name: "Regular", price: 2000, available: 150 }
      ]
    },
    { 
      id: 2, 
      name: "Lust Stories", 
      revenue: 50000, 
      ticketsSold: 300,
      date: "2024-05-20",
      venue: "Theater Hall",
      status: "Active",
      categories: [
        { name: "Premium", price: 3000, available: 100 },
        { name: "Standard", price: 1500, available: 200 }
      ]
    },
    { 
      id: 3, 
      name: "Food & Wine Expo", 
      revenue: 75000, 
      ticketsSold: 500,
      date: "2024-06-10",
      venue: "Convention Center",
      status: "Active",
      categories: [
        { name: "All Access", price: 4000, available: 75 },
        { name: "Day Pass", price: 2500, available: 300 }
      ]
    },
  ]);

  const totalRevenue = events.reduce((acc, event) => acc + event.revenue, 0);
  const totalTicketsSold = events.reduce((acc, event) => acc + event.ticketsSold, 0);

  const [monthlyRevenue, setMonthlyRevenue] = useState([
    { month: "January", revenue: 10000 },
    { month: "February", revenue: 15000 },
    { month: "March", revenue: 20000 },
    { month: "April", revenue: 25000 },
    { month: "May", revenue: 30000 },
    { month: "June", revenue: 35000 },
    { month: "July", revenue: 40000 },
    { month: "August", revenue: 45000 },
    { month: "September", revenue: 50000 },
    { month: "October", revenue: 55000 },
    { month: "November", revenue: 60000 },
    { month: "December", revenue: 65000 },
  ]);

  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", tickets: 2, totalSpent: 10000, status: "Active", lastActive: "2024-03-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", tickets: 3, totalSpent: 15000, status: "Active", lastActive: "2024-03-15" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", tickets: 1, totalSpent: 5000, status: "Active", lastActive: "2024-03-12" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", tickets: 4, totalSpent: 20000, status: "Active", lastActive: "2024-03-18" },
    { id: 5, name: "Bob White", email: "bob@example.com", tickets: 2, totalSpent: 12000, status: "Active", lastActive: "2024-03-20" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const totalUsers = recentUsers.length;
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: 0,
    name: "",
    revenue: 0,
    ticketsSold: 0,
    date: "",
    venue: "",
    status: "Active",
    categories: [] as { name: string; price: number; available: number }[]
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddEvent = () => {
    const { id, ...restNewEvent } = newEvent;
    const event = {
      id: events.length + 1,
      ...restNewEvent,
      revenue: 0,
      ticketsSold: 0
    };
    setEvents([...events, event]);
    setShowAddEventForm(false);
    setNewEvent({
      id: 0,
      name: "",
      revenue: 0,
      ticketsSold: 0,
      date: "",
      venue: "",
      status: "Active",
      categories: []
    });
  };

  const handleEditEvent = (id: number) => {
    const eventToEdit = events.find(event => event.id === id);
    if (eventToEdit) {
      setNewEvent(eventToEdit);
    }
    setShowAddEventForm(true);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const filteredUsers = recentUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentEventsShowcase = [
    {
      id: 1,
      image: "/images/lust.jpg",
      title: "Lust and Stories",
      location: "Cmm",
      description: "Lust and Stories Event",
      price: 1000,
      date: "2025-04-15",
      time: "10:00 AM",
      sold: 150,
    },
    {
      id: 2,
      image: "/images/feee.jpeg",
      title: "Fearless Movement Event",
      location: "Limuru Cmm",
      description: "Annual youth camp",
      price: 5000,
      date: "2025-08-25",
      time: "11:00 AM",
      sold: 200,
    },
    {
      id: 3,
      image: "/images/lst.jpeg",
      title: "Pastors Conference",
      location: "Icc Imara",
      description: "Annual Pastors conference event",
      price: 300,
      date: "2024-06-10",
      time: "12:00 PM",
      sold: 150,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-gray-500">Total Revenue</p>
                    <h2 className="text-2xl font-bold">Ksh. {totalRevenue}</h2>
                  </div>
                  <LucideDollarSign className="w-10 h-10 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-gray-500">Total Tickets Sold</p>
                    <h2 className="text-2xl font-bold">{totalTicketsSold}</h2>
                  </div>
                  <LucideTicket className="w-10 h-10 text-blue-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-gray-500">Total Users</p>
                    <h2 className="text-2xl font-bold">{totalUsers}</h2>
                  </div>
                  <LucideUsers className="w-10 h-10 text-purple-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-gray-500">Active Events</p>
                    <h2 className="text-2xl font-bold">{events.filter(e => e.status === "Active").length}</h2>
                  </div>
                  <LucideCalendar className="w-10 h-10 text-orange-500" />
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4">Recent Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-right">Tickets</th>
                        <th className="p-2 text-right">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.slice(0, 3).map(user => (
                        <tr key={user.id} className="border-t hover:bg-blue-50 transition-colors duration-200">
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2 text-right">{user.tickets}</td>
                          <td className="p-2 text-right">Ksh. {user.totalSpent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="primary" className="flex items-center justify-center hover:scale-105 transition-transform duration-200">
                    <LucidePlus className="w-4 h-4 mr-2" /> Create Event
                  </Button>
                  <Button variant="secondary" className="flex items-center justify-center hover:scale-105 transition-transform duration-200">
                    <LucideBarChart className="w-4 h-4 mr-2" /> Generate Report
                  </Button>
                  <Button variant="secondary" className="flex items-center justify-center hover:scale-105 transition-transform duration-200">
                    <LucideUsers className="w-4 h-4 mr-2" /> Manage Users
                  </Button>
                  <Button variant="secondary" className="flex items-center justify-center hover:scale-105 transition-transform duration-200">
                    <LucideSettings className="w-4 h-4 mr-2" /> Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* New Sections: Sales Revenue Chart and Recent Events */}
            <div className="mt-6 grid grid-cols-1 gap-6">
              {/* Sales Revenue Chart */}
              <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Sales Revenue</h3>
                  <div className="flex items-center">
                    <Button variant="primary" className="mr-2 text-sm hover:scale-105 transition-transform duration-200">Monthly</Button>
                    <Button variant="secondary" className="mr-2 text-sm hover:scale-105 transition-transform duration-200">Weekly</Button>
                    <Button variant="secondary" className="text-sm hover:scale-105 transition-transform duration-200">Daily</Button>
                  </div>
                </div>
                <div className="h-64 relative">
                  {/* This is a placeholder for the chart - in a real app, you'd use a chart library */}
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md z-10 hover:shadow-lg hover:scale-105 transition-all duration-200">
                    <div className="text-sm text-gray-500">July 24, 2020</div>
                  </div>
                  <div className="w-full h-full bg-red-50 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-dashed border-gray-300"></div>
                    <div className="absolute h-1/3 w-full bottom-0 bg-gradient-to-t from-red-100 to-transparent"></div>
                    <div className="absolute h-full w-full top-0 left-0" style={{ background: 'linear-gradient(90deg, transparent 9%, rgba(0,0,0,0.05) 10%, transparent 11%, transparent)' }}></div>
                    <div className="absolute h-3/4 w-full top-1/4 left-0">
                      <svg viewBox="0 0 1000 300" className="w-full h-full">
                        <path d="M0,150 Q50,100 100,150 T200,100 T300,150 T400,100 T500,150 T600,100 T700,150 T800,100 T900,150 T1000,100" fill="none" stroke="#F87171" strokeWidth="4"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    {monthlyRevenue.map((item, index) => (
                      <div key={index}>{item.month.substring(0, 3)}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Events */}
              <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Recent Events</h3>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                    <button className="ml-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 hover:scale-110 transition-all duration-200">
                      <LucideChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentEventsShowcase.map((event) => (
                    <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-75 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">{event.location}</p>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-1 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                              <span className="text-sm font-bold">Ksh.{event.price.toFixed(2)}</span>
                            </div>
                            <div className="ml-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <LucideCalendar className="w-3 h-3 mr-1" />
                                {event.date}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <div>{event.sold} sold</div>
                          <div className="flex items-center">
                            <LucideCalendar className="w-3 h-3 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "events":
        return (
          <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Event Management</h3>
              <Button 
                variant="primary" 
                className="flex items-center hover:scale-105 transition-transform duration-200"
                onClick={() => setShowAddEventForm(!showAddEventForm)}
              >
                <LucidePlus className="w-4 h-4 mr-2" /> Add New Event
              </Button>
            </div>
            {showAddEventForm && (
              <div className="mb-4">
                <h4 className="text-lg font-bold mb-2">Add New Event</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="p-2 border rounded-lg"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  />
                  <input
                    type="date"
                    placeholder="Event Date"
                    className="p-2 border rounded-lg"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Venue"
                    className="p-2 border rounded-lg"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  />
                  <select
                    className="p-2 border rounded-lg"
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <Button 
                  variant="primary" 
                  className="mt-2"
                  onClick={handleAddEvent}
                >
                  Add Event
                </Button>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Event Name</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Venue</th>
                    <th className="p-2 text-center">Status</th>
                    <th className="p-2 text-right">Revenue</th>
                    <th className="p-2 text-right">Tickets Sold</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id} className="border-t hover:bg-blue-50 transition-colors duration-200">
                      <td className="p-2">{event.name}</td>
                      <td className="p-2">{event.date}</td>
                      <td className="p-2">{event.venue}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="p-2 text-right">Ksh. {event.revenue}</td>
                      <td className="p-2 text-right">{event.ticketsSold}</td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            className="p-1 hover:bg-gray-100 rounded hover:scale-110 transition-all duration-200"
                            onClick={() => handleEditEvent(event.id)}
                          >
                            <LucideEdit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button 
                            className="p-1 hover:bg-gray-100 rounded hover:scale-110 transition-all duration-200"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <LucideTrash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "tickets":
        return (
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4">{event.name} - Ticket Categories</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-right">Price</th>
                        <th className="p-2 text-right">Available</th>
                        <th className="p-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.categories.map((category, idx) => (
                        <tr key={idx} className="border-t hover:bg-blue-50 transition-colors duration-200">
                          <td className="p-2">{category.name}</td>
                          <td className="p-2 text-right">Ksh. {category.price}</td>
                          <td className="p-2 text-right">{category.available}</td>
                          <td className="p-2 text-center">
                            <div className="flex justify-center space-x-2">
                              <button className="p-1 hover:bg-gray-100 rounded hover:scale-110 transition-all duration-200">
                                <LucideEdit className="w-4 h-4 text-blue-500" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded hover:scale-110 transition-all duration-200">
                                <LucideTrash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        );

      case "users":
        return (
          <div className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">User Management</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <LucideSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="secondary" className="flex items-center hover:scale-105 transition-transform duration-200">
                  <LucideFilter className="w-4 h-4 mr-2" /> Filter
                </Button>
                <Button variant="primary" className="flex items-center hover:scale-105 transition-transform duration-200">
                  <LucideUserPlus className="w-4 h-4 mr-2" /> Add User
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-center">Status</th>
                    <th className="p-2 text-center">Last Active</th>
                    <th className="p-2 text-right">Tickets</th>
                    <th className="p-2 text-right">Total Spent</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-t hover:bg-blue-50 transition-colors duration-200">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-2 text-center">{user.lastActive}</td>
                      <td className="p-2 text-right">{user.tickets}</td>
                      <td className="p-2 text-right">Ksh. {user.totalSpent}</td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded hover:scale-110 transition-all duration-200">
                            <LucideEdit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded hover:scale-110 transition-all duration-200">
                            <LucideTrash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">Showing {filteredUsers.length} of {totalUsers} users</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors duration-200">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors duration-200">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors duration-200">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors duration-200">Next</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 hover:shadow-lg transition-shadow duration-300`}>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <LucideLayoutDashboard className="w-6 h-6 mr-2" /> Admin Dashboard
        </h2>
        <nav className="space-y-2">
          <Button
            variant={activeTab === "overview" ? "primary" : "secondary"}
            className="w-full text-left flex items-center hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveTab("overview")}
          >
            <LucideLayoutDashboard className="w-4 h-4 mr-2" /> Overview
          </Button>
          <Button
            variant={activeTab === "events" ? "primary" : "secondary"}
            className="w-full text-left flex items-center hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveTab("events")}
          >
            <LucideCalendar className="w-4 h-4 mr-2" /> Events
          </Button>
          <Button
            variant={activeTab === "tickets" ? "primary" : "secondary"}
            className="w-full text-left flex items-center hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveTab("tickets")}
          >
            <LucideTicket className="w-4 h-4 mr-2" /> Tickets
          </Button>
          <Button
            variant={activeTab === "users" ? "primary" : "secondary"}
            className="w-full text-left flex items-center hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveTab("users")}
          >
            <LucideUsers className="w-4 h-4 mr-2" /> Users
          </Button>
          <Button
            variant={activeTab === "reports" ? "primary" : "secondary"}
            className="w-full text-left flex items-center hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveTab("reports")}
          >
            <LucideBarChart className="w-4 h-4 mr-2" /> Reports
          </Button>
          <Button
            variant={activeTab === "settings" ? "primary" : "secondary"}
            className="w-full text-left flex items-center hover:scale-105 transition-transform duration-200"
            onClick={() => setActiveTab("settings")}
          >
            <LucideSettings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDarkMode ? (
              <LucideSun className="w-6 h-6 text-yellow-500" />
            ) : (
              <LucideMoon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

import { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">{children}</div>;
}

function CardContent({ children, className = "" }: { children: ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, variant = "primary", className = "", ...props }: { children: ReactNode, variant?: "primary" | "secondary" | "danger", className?: string, [key: string]: any }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}