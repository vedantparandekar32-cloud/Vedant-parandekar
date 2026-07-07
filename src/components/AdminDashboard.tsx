import React, { useState } from "react";
import { 
  BarChart3, Users, Compass, ShieldCheck, Trash2, 
  Plus, Edit2, AlertCircle, Eye, EyeOff, BookOpen, Clock, TrendingUp
} from "lucide-react";
import { Destination } from "../types";

interface AdminDashboardProps {
  destinations: Destination[];
  onAddDestination: (dest: Destination) => void;
  onUpdateDestination: (dest: Destination) => void;
  onDeleteDestination: (id: string) => void;
}

export default function AdminDashboard({
  destinations,
  onAddDestination,
  onUpdateDestination,
  onDeleteDestination,
}: AdminDashboardProps) {
  const [adminTab, setAdminTab] = useState<"analytics" | "destinations" | "bookings">("analytics");

  // State: Hidden destination IDs
  const [hiddenDestIds, setHiddenDestIds] = useState<string[]>([]);

  // State: Bookings lists
  const [bookingsList, setBookingsList] = useState([
    { id: "b-1", client: "Emily Watson", destination: "Kyoto, Japan", hotel: "Hoshinoya Kyoto", date: "2026-08-12", status: "Pending" },
    { id: "b-2", client: "David Miller", destination: "Maui, Hawaii", hotel: "Grand Wailea Resort", date: "2026-09-01", status: "Approved" },
    { id: "b-3", client: "Sophia Loren", destination: "Banff, Canada", hotel: "Fairmont Banff Springs", date: "2026-07-28", status: "Approved" },
    { id: "b-4", client: "Kenji Sato", destination: "Rome, Italy", hotel: "Hotel Artemide", date: "2026-10-15", status: "Pending" },
  ]);

  // State: Create New Destination Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDestName, setNewDestName] = useState("");
  const [newDestCountry, setNewDestCountry] = useState("");
  const [newDestCategory, setNewDestCategory] = useState("Beach");
  const [newDestOverview, setNewDestOverview] = useState("");
  const [newDestImage, setNewDestImage] = useState("");
  const [newDestBudget, setNewDestBudget] = useState(120);

  const toggleVisibility = (id: string) => {
    if (hiddenDestIds.includes(id)) {
      setHiddenDestIds(prev => prev.filter(x => x !== id));
    } else {
      setHiddenDestIds(prev => [...prev, id]);
    }
  };

  const handleCreateDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestName.trim() || !newDestCountry.trim()) return;

    const newDest: Destination = {
      id: `dest-${Date.now()}`,
      name: newDestName,
      country: newDestCountry,
      city: newDestName,
      category: newDestCategory as any,
      image: newDestImage || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
      overview: newDestOverview || "No detailed overview provided yet.",
      shortDescription: newDestOverview ? newDestOverview.slice(0, 150) + "..." : "No short description provided.",
      rating: 4.8,
      bestSeason: "Spring & Autumn",
      averageBudget: newDestBudget,
      language: "English & Local",
      currency: "Local Currency",
      history: "Historic information is being compiled.",
      culture: "Cultural details are currently expanding.",
      attractions: [],
      hotels: [],
      restaurants: [],
      activities: [],
      localGuide: { traditions: [], festivals: [], dressCode: "Standard dress conventions.", etiquette: [], phrases: [], safetyAdvice: [] },
      emergencyNumbers: { police: "112", medical: "112", touristSOS: "112" },
      transportation: [],
      coordinates: { lat: 0, lng: 0 },
      photos: [],
      reviews: []
    };

    onAddDestination(newDest);
    setShowAddForm(false);
    setNewDestName("");
    setNewDestCountry("");
    setNewDestOverview("");
    setNewDestImage("");
    alert("New Destination added successfully to the database!");
  };

  const handleApproveBooking = (id: string) => {
    setBookingsList(prev => prev.map(b => b.id === id ? { ...b, status: "Approved" } : b));
  };

  const handleRejectBooking = (id: string) => {
    setBookingsList(prev => prev.map(b => b.id === id ? { ...b, status: "Rejected" } : b));
  };

  return (
    <div id="admin-dashboard-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Title */}
      <div className="border-b border-gray-100 dark:border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-6.5 w-6.5 text-ocean" />
            <span>Site Administration Hub</span>
          </h2>
          <p className="text-xs font-sans text-gray-500 mt-1">
            Track analytical traffic, approve lodging reservations, toggle visibility states of guide materials, or append new destinations.
          </p>
        </div>

        {/* Outer Tabs Selection */}
        <div className="flex bg-gray-55 dark:bg-slate-900 p-1 rounded-xl border border-gray-100 dark:border-slate-800 flex-wrap gap-1">
          {[
            { id: "analytics", label: "Core Analytics", icon: TrendingUp },
            { id: "destinations", label: "Guide Catalogs", icon: Compass },
            { id: "bookings", label: "Active Reservations", icon: Clock },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                id={`admin-tab-btn-${item.id}`}
                key={item.id}
                onClick={() => setAdminTab(item.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-2xs font-sans font-bold uppercase tracking-wider transition-all ${
                  adminTab === item.id
                    ? "bg-white dark:bg-slate-800 text-ocean dark:text-sky shadow-sm border border-gray-100 dark:border-slate-700"
                    : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* 1. ANALYTICS VIEW */}
      {adminTab === "analytics" && (
        <div id="admin-panel-analytics" className="space-y-8 animate-fade-in">
          {/* Analytics KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Registrations", value: "1,248 Users", rate: "+12% this week", icon: Users, color: "text-ocean bg-ocean/10" },
              { label: "Unique Visitors", value: "14,832 Visits", rate: "+28% vs last month", icon: Compass, color: "text-emerald-green bg-emerald-green/10" },
              { label: "Saved AI Itineraries", value: "3,812 Plans", rate: "+15% this week", icon: BarChart3, color: "text-sunset bg-sunset/10" },
              { label: "Partner Gross Sales", value: "$42,500 USD", rate: "+8% this week", icon: ShieldCheck, color: "text-golden bg-golden/10" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">{card.label}</span>
                    <p className="font-display font-black text-xl text-gray-900 dark:text-white leading-none">{card.value}</p>
                    <span className="text-[9px] font-mono text-emerald-green font-bold block mt-0.5">{card.rate}</span>
                  </div>
                  <div className={`p-3 rounded-xl ${card.color} flex-shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Analytics charts (Beautiful HTML markup visual metrics) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white mb-4">Popular AI Planner Destination Choices</h4>
              <div className="space-y-3.5 text-xs font-sans">
                {[
                  { name: "Kyoto, Japan", count: 1250, percentage: 85 },
                  { name: "Banff, Canada", count: 830, percentage: 55 },
                  { name: "Maui, Hawaii", count: 720, percentage: 48 },
                  { name: "Serengeti, Tanzania", count: 510, percentage: 34 },
                  { name: "Rome, Italy", count: 500, percentage: 33 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-gray-800 dark:text-slate-200">{item.name}</span>
                      <span className="font-mono text-gray-400">{item.count} saved</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-slate-850 rounded-full overflow-hidden">
                      <div className="h-full bg-ocean dark:bg-sky rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white mb-2">Partner API & Key Telemetry Status</h4>
                <p className="text-2xs text-gray-400">Track server-side key integrations connected in your settings panel.</p>
              </div>

              <div className="space-y-3.5 pt-4 text-xs font-sans">
                {[
                  { name: "Gemini Pro / Flash Model Engine", status: "ONLINE", details: "gemini-3.5-flash standard" },
                  { name: "OpenStreetMap Data Nodes", status: "CONNECTED", details: "Dynamic custom canvas map layer" },
                  { name: "Currency Exchange Rates API", status: "ACTIVE", details: "Fallback tables synced hourly" },
                  { name: "Local Cache storage memory", status: "SYNCED", details: "Durable state sandbox" }
                ].map((row, idx) => (
                  <div key={idx} className="p-3 bg-gray-55 dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-850 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{row.name}</p>
                      <span className="text-[10px] text-gray-400 block font-mono">{row.details}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-light dark:bg-emerald-dark/10 text-emerald-green border border-emerald-green/10 rounded font-mono font-bold text-3xs">
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MANAGE DESTINATIONS */}
      {adminTab === "destinations" && (
        <div id="admin-panel-destinations" className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Guide Catalogs List</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-ocean text-white rounded-xl text-2xs font-sans font-bold tracking-wide uppercase flex items-center space-x-1"
            >
              {showAddForm ? <span>Close Panel</span> : <span>+ Add Destination</span>}
            </button>
          </div>

          {/* Form to Append New Destination */}
          {showAddForm && (
            <form 
              onSubmit={handleCreateDestinationSubmit} 
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md text-xs font-sans space-y-4"
            >
              <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">Add New Destination to Guide</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Destination/City Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Barcelona"
                    value={newDestName}
                    onChange={(e) => setNewDestName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Country Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spain"
                    value={newDestCountry}
                    onChange={(e) => setNewDestCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Guide Theme Category</label>
                  <select
                    value={newDestCategory}
                    onChange={(e) => setNewDestCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl"
                  >
                    <option value="Beach">Beach Escapes</option>
                    <option value="Mountains">Mountain Ranges</option>
                    <option value="Heritage">Heritage & History</option>
                    <option value="Wildlife">Wildlife & Safari</option>
                    <option value="Spiritual">Spiritual Sanctuaries</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Thumbnail Photo Link</label>
                  <input
                    type="text"
                    placeholder="Image URL link..."
                    value={newDestImage}
                    onChange={(e) => setNewDestImage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Average Daily Cost Target (USD)</label>
                  <input
                    type="number"
                    value={newDestBudget}
                    onChange={(e) => setNewDestBudget(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Destination Overview Text</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the climate, culture, key highlights, local culinary, and travel tips..."
                  value={newDestOverview}
                  onChange={(e) => setNewDestOverview(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-ocean text-white rounded-xl font-bold"
                >
                  Save to Guide Catalogs
                </button>
              </div>
            </form>
          )}

          {/* Table representing all catalogs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
            <div className="p-4 bg-gray-55 dark:bg-slate-950 border-b border-gray-100 dark:border-slate-850">
              <span className="font-display font-bold text-gray-900 dark:text-white">Database Guides Catalog ({destinations.length} active entries)</span>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-850 max-h-[500px] overflow-y-auto no-scrollbar">
              {destinations.map((dest) => {
                const isHidden = hiddenDestIds.includes(dest.id);
                return (
                  <div key={dest.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-slate-850 transition-colors">
                    <div className="flex items-center space-x-4 min-w-0">
                      <img src={dest.image} alt={dest.name} className="h-12 w-12 rounded-xl object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 truncate">
                          {dest.name}
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded text-[9px] text-gray-500 font-mono font-bold">
                            {dest.category}
                          </span>
                        </h4>
                        <p className="text-2xs text-gray-400 mt-0.5">{dest.country} • Rating: {dest.rating.toFixed(1)} • Daily target: ${dest.averageBudget}/day</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {/* Hide toggle */}
                      <button
                        onClick={() => toggleVisibility(dest.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isHidden 
                            ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100" 
                            : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                        title={isHidden ? "Hidden from users (Publish)" : "Published (Hide from users)"}
                      >
                        {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${dest.name} guide?`)) {
                            onDeleteDestination(dest.id);
                          }
                        }}
                        className="p-1.5 bg-red-50/50 border border-red-100 text-red-500 hover:bg-red-50 dark:bg-red-950/20 dark:border-red-950/50 rounded-lg"
                        title="Delete guide permanently"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. MANAGE RESERVATIONS/BOOKINGS */}
      {adminTab === "bookings" && (
        <div id="admin-panel-bookings" className="space-y-6 animate-fade-in">
          <div>
            <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Active Lodging Reservations</h3>
            <p className="text-xs text-gray-400">Review pending reservation queues, issue confirmation codes, or contact travelers.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm text-xs">
            <div className="p-4 bg-gray-55 dark:bg-slate-950 border-b border-gray-100 dark:border-slate-850">
              <span className="font-display font-bold text-gray-900 dark:text-white">Reservations Queue</span>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-850">
              {bookingsList.map((booking) => (
                <div key={booking.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Booking {booking.id} • Date: {booking.date}</span>
                    <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white">
                      {booking.client} booked <span className="text-ocean dark:text-sky">{booking.hotel}</span>
                    </h4>
                    <p className="text-2xs text-gray-500">Destination: {booking.destination}</p>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <span className={`px-2.5 py-1 rounded-xl text-3xs font-mono font-bold uppercase tracking-wider ${
                      booking.status === "Approved" ? "bg-emerald-light text-emerald-green" :
                      booking.status === "Rejected" ? "bg-red-50 text-red-500" :
                      "bg-yellow-50 text-yellow-600"
                    }`}>
                      {booking.status}
                    </span>

                    {booking.status === "Pending" && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleApproveBooking(booking.id)}
                          className="px-2.5 py-1 bg-emerald-green text-white hover:bg-emerald-dark rounded-lg text-2xs font-bold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="px-2.5 py-1 bg-red-500 text-white hover:bg-red-600 rounded-lg text-2xs font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
