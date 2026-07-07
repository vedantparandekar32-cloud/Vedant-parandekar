import React, { useState, useEffect } from "react";
import { Search, Calendar, Users, MapPin, Sparkles } from "lucide-react";

interface HeroProps {
  onSearch: (filters: {
    category: string;
    location: string;
    date: string;
    travelers: number;
  }) => void;
}

const BACKGROUNDS = [
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    title: "Banff Glacial Serenity, Canada",
  },
  {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
    title: "Golden Pavilion Serenity, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    title: "Sandy Turquoise Escapes, Maui",
  },
  {
    url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1600&auto=format&fit=crop",
    title: "Raw African Grasslands, Serengeti",
  }
];

export default function Hero({ onSearch }: HeroProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ category, location, date, travelers });
  };

  return (
    <section id="hero-section" className="relative w-full h-[600px] lg:h-[650px] overflow-hidden flex items-center justify-center transition-all duration-1000">
      {/* Background Slideshow */}
      {BACKGROUNDS.map((bg, idx) => (
        <div
          id={`hero-bg-slide-${idx}`}
          key={bg.url}
          className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
            idx === bgIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("${bg.url}")`,
            transitionProperty: "opacity, transform",
          }}
        >
          {/* Subtle photographer attribution in bottom right corner */}
          <div className="absolute bottom-4 right-6 text-3xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
            {bg.title}
          </div>
        </div>
      ))}

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
        {/* Animated Badge */}
        <div 
          id="hero-ai-badge"
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 mb-6 text-xs text-emerald-800 dark:text-emerald-400 font-sans font-bold uppercase tracking-widest animate-pulse"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>AI-Powered Travel Intelligence</span>
        </div>

        {/* Headlines */}
        <h1 
          id="hero-headline"
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.0] max-w-4xl text-white text-shadow-md"
        >
          Discover Your Next <span className="text-sky-light dark:text-sky">Adventure</span>
        </h1>
        <p 
          id="hero-subheading"
          className="mt-4 font-sans text-base sm:text-lg lg:text-xl text-slate-100 max-w-2xl text-shadow-sm font-light leading-relaxed"
        >
          Explore thousands of handpicked destinations, craft personalized itineraries with AI, and experience local culture like never before.
        </p>

        {/* Responsive Search Box Container */}
        <form
          id="hero-search-form"
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-5xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-2xl text-gray-800 dark:text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 border border-slate-100 dark:border-slate-800/80"
        >
          {/* Location field */}
          <div id="search-field-location" className="flex items-center space-x-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-xl hover:border-ocean dark:hover:border-sky transition-colors">
            <MapPin className="h-5 w-5 text-ocean dark:text-sky flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">Where To?</label>
              <input
                id="search-input-location"
                type="text"
                placeholder="Country, city..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs font-sans font-semibold focus:outline-none dark:text-white mt-0.5"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div id="search-field-category" className="flex items-center space-x-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-xl hover:border-ocean dark:hover:border-sky transition-colors">
            <Sparkles className="h-5 w-5 text-ocean dark:text-sky flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">Vibe / Theme</label>
              <select
                id="search-select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-sans font-semibold focus:outline-none dark:text-white border-0 p-0 mt-0.5"
              >
                <option value="" className="dark:bg-slate-900">Any Vibe</option>
                <option value="Beach" className="dark:bg-slate-900">Beach Escapes</option>
                <option value="Mountains" className="dark:bg-slate-900">Mountain Ranges</option>
                <option value="Heritage" className="dark:bg-slate-900">Heritage & History</option>
                <option value="Wildlife" className="dark:bg-slate-900">Wildlife & Safari</option>
                <option value="Spiritual" className="dark:bg-slate-900">Spiritual Sanctuaries</option>
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div id="search-field-date" className="flex items-center space-x-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-xl hover:border-ocean dark:hover:border-sky transition-colors">
            <Calendar className="h-5 w-5 text-ocean dark:text-sky flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">When?</label>
              <input
                id="search-input-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs font-sans font-semibold focus:outline-none dark:text-white mt-0.5"
              />
            </div>
          </div>

          {/* Travelers Selector */}
          <div id="search-field-travelers" className="flex items-center space-x-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-xl hover:border-ocean dark:hover:border-sky transition-colors">
            <Users className="h-5 w-5 text-ocean dark:text-sky flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 font-bold">Travelers</label>
              <select
                id="search-select-travelers"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="w-full bg-transparent text-xs font-sans font-semibold focus:outline-none dark:text-white mt-0.5 border-0 p-0"
              >
                <option value={1} className="dark:bg-slate-900">1 Traveler</option>
                <option value={2} className="dark:bg-slate-900">2 Travelers</option>
                <option value={4} className="dark:bg-slate-900">Family (4+)</option>
                <option value={10} className="dark:bg-slate-900">Group (10+)</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div id="search-field-btn" className="flex items-center justify-center p-0.5 col-span-1 sm:col-span-2 lg:col-span-1">
            <button
              id="search-submit-btn"
              type="submit"
              className="w-full h-12 bg-sky-600 hover:bg-sky-700 dark:bg-sky dark:hover:bg-sky/80 text-white dark:text-slate-950 rounded-xl font-sans font-bold text-xs shadow-lg shadow-sky-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Search className="h-4.5 w-4.5" />
              <span>Generate Trip</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
