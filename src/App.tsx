import React, { useState, useEffect } from "react";
import { FEATURED_DESTINATIONS, SAMPLE_BLOGS } from "./data/destinations";
import { Destination, Blog, SavedItinerary, UserProfile } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DestinationCard from "./components/DestinationCard";
import DestinationDetails from "./components/DestinationDetails";
import AIPositioner from "./components/AIPositioner";
import ExtraTools from "./components/ExtraTools";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import BlogSection from "./components/BlogSection";
import { 
  Sparkles, Compass, Heart, Globe, Settings, MapPin, 
  User, ShieldCheck, Mail, Info, Calendar, Users
} from "lucide-react";

const DEFAULT_PROFILE: UserProfile = {
  id: "user-explorer",
  name: "Alex Mercer",
  email: "alex.mercer@explorer.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  favorites: [],
  wishlist: [],
  tripHistory: [
    { destinationId: "kyoto-japan", destinationName: "Kyoto", date: "2026-04-10", days: 5 },
    { destinationId: "maui-hawaii", destinationName: "Maui", date: "2026-06-15", days: 4 }
  ],
  journalEntries: []
};

export default function App() {
  // Primary Navigation / Router tab state
  // Can be: "home", "destinations", "ai-tools", "blogs", "user-dashboard", "admin" or "dest-<id>"
  const [activeTab, setActiveTab] = useState<string>("home");

  // Core Database States (Managed by Admin/Local)
  const [destinations, setDestinations] = useState<Destination[]>(FEATURED_DESTINATIONS);
  const [blogs, setBlogs] = useState<Blog[]>(SAMPLE_BLOGS);

  // User details & local memory states
  const [user, setUser] = useState<UserProfile>(() => {
    const cached = localStorage.getItem("travel_user_profile");
    return cached ? JSON.parse(cached) : DEFAULT_PROFILE;
  });
  const [favoriteDestIds, setFavoriteDestIds] = useState<string[]>(() => {
    const cached = localStorage.getItem("travel_favorites");
    return cached ? JSON.parse(cached) : ["kyoto-japan", "banff-canada"];
  });
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>(() => {
    const cached = localStorage.getItem("travel_saved_itineraries");
    return cached ? JSON.parse(cached) : [];
  });

  // Global UI Preferences
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const cached = localStorage.getItem("travel_dark_mode");
    return cached === "true";
  });
  const [language, setLanguage] = useState<string>("en");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Authentication Simulated Modal states
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authName, setAuthName] = useState<string>("");
  const [authIsRegistering, setAuthIsRegistering] = useState<boolean>(false);

  // States from Hero Search Box parameters
  const [heroSearchFilters, setHeroSearchFilters] = useState<{
    category: string;
    location: string;
    date: string;
    travelers: number;
  } | null>(null);

  // Sync state modifications with Local Storage for persistence
  useEffect(() => {
    localStorage.setItem("travel_user_profile", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("travel_favorites", JSON.stringify(favoriteDestIds));
  }, [favoriteDestIds]);

  useEffect(() => {
    localStorage.setItem("travel_saved_itineraries", JSON.stringify(savedItineraries));
  }, [savedItineraries]);

  // Sync Dark/Light theme class to index.html container node
  useEffect(() => {
    localStorage.setItem("travel_dark_mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch from live database if available (fallback to preloaded constants)
  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        const destRes = await fetch("/api/destinations");
        if (destRes.ok) {
          const destData = await destRes.json();
          if (Array.isArray(destData) && destData.length > 0) {
            setDestinations(destData);
          }
        }
        const blogRes = await fetch("/api/blogs");
        if (blogRes.ok) {
          const blogData = await blogRes.json();
          if (Array.isArray(blogData) && blogData.length > 0) {
            setBlogs(blogData);
          }
        }
      } catch (err) {
        console.warn("Express backend API unavailable. Using preloaded client sandbox database.");
      }
    };
    fetchDatabase();
  }, []);

  // Filter destination array based on category selectors & searches
  const filteredDestinations = destinations.filter((dest) => {
    // 1. Theme categories
    const matchesCategory =
      selectedCategory === "All" || dest.category === selectedCategory;

    // 2. Global search queries (by title, city, or country)
    const matchesGlobalSearch =
      searchQuery.trim() === "" ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.city.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Hero searches
    const matchesHeroLocation =
      !heroSearchFilters?.location ||
      dest.name.toLowerCase().includes(heroSearchFilters.location.toLowerCase()) ||
      dest.country.toLowerCase().includes(heroSearchFilters.location.toLowerCase());

    const matchesHeroCategory =
      !heroSearchFilters?.category ||
      dest.category === heroSearchFilters.category;

    return matchesCategory && matchesGlobalSearch && matchesHeroLocation && matchesHeroCategory;
  });

  // Toggle favorite trigger handler
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteDestIds.includes(id)) {
      setFavoriteDestIds((prev) => prev.filter((x) => x !== id));
    } else {
      setFavoriteDestIds((prev) => [...prev, id]);
    }
  };

  const handleRemoveFavoriteFromDashboard = (id: string) => {
    setFavoriteDestIds((prev) => prev.filter((x) => x !== id));
  };

  // Auth simulated logic
  const handleSimulatedAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;

    const loggedInUser: UserProfile = {
      ...user,
      name: authName.trim() || authEmail.split("@")[0],
      email: authEmail.trim(),
    };
    setUser(loggedInUser);
    setShowAuthModal(false);
    setAuthEmail("");
    setAuthName("");
    alert(`Successfully signed in as ${loggedInUser.name}! Welcome back.`);
  };

  // Admin dynamic adjustments
  const handleAddDestination = (newDest: Destination) => {
    setDestinations((prev) => [newDest, ...prev]);
  };

  const handleUpdateDestination = (updatedDest: Destination) => {
    setDestinations((prev) => prev.map((d) => d.id === updatedDest.id ? updatedDest : d));
  };

  const handleDeleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  // Route back control
  const handleBackToDestinations = () => {
    setActiveTab("destinations");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* 1. Header Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Reset hero filter search on tab click to restore grid
          if (tab !== "home" && tab !== "destinations") {
            setHeroSearchFilters(null);
          }
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onOpenAuth={() => {
          setAuthIsRegistering(false);
          setShowAuthModal(true);
        }}
      />

      {/* 2. Main Router Layout Content */}
      <main className="flex-grow">
        
        {/* VIEW: HOME PAGE */}
        {activeTab === "home" && (
          <div id="view-home" className="space-y-12 pb-16 animate-fade-in">
            {/* Hero Banner Section */}
            <Hero
              onSearch={(filters) => {
                setHeroSearchFilters(filters);
                setActiveTab("destinations");
                // Scroll down to the grid search results
                setTimeout(() => {
                  document.getElementById("catalog-grids")?.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
            />

            {/* Travel Themes Carousel Selection */}
            <section id="travel-themes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono text-sky-600 dark:text-sky font-bold tracking-widest block">Explore Themes</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-slate-950 dark:text-white">Curated Travel Experiences</h2>
                <p className="text-xs text-slate-500 max-w-lg mx-auto">Select your favorite aesthetic, and let our custom guides outline historic monuments, local food, and activities.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["All", "Beach", "Mountains", "Heritage", "Wildlife", "Spiritual"].map((cat) => (
                  <button
                    id={`category-btn-${cat}`}
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab("destinations");
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-sans font-bold transition-all ${
                      selectedCategory === cat
                        ? "bg-sky-600 text-white dark:bg-sky dark:text-slate-900 shadow-lg shadow-sky-100 dark:shadow-none"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 hover:bg-slate-50 border border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {cat === "All" ? "🌍 Show All" : cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Destinations Row */}
            <section id="featured-destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
              <div className="flex items-end justify-between border-b border-slate-200/80 dark:border-slate-850 pb-4">
                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-slate-950 dark:text-white">Featured Destinations</h3>
                  <p className="text-2xs text-slate-400 mt-1">Explore pristine locations backed by real-time safety indices and AI planners.</p>
                </div>
                <button
                  id="view-all-dest-btn"
                  onClick={() => { setSelectedCategory("All"); setActiveTab("destinations"); }}
                  className="text-2xs font-sans font-bold text-sky-600 dark:text-sky hover:underline"
                >
                  View All Guides →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.slice(0, 3).map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onExplore={(id) => setActiveTab(`dest-${id}`)}
                    isFavorite={favoriteDestIds.includes(dest.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </section>

            {/* Traveler's Smart Toolbox Segment */}
            <section id="toolbox-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 text-left">
                  <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-3xs font-mono font-bold uppercase tracking-widest">
                    <Globe className="h-3 w-3" />
                    <span>Traveler Utility Toolbox</span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-slate-950 dark:text-white leading-tight">Instant Currency & Translate Utilities</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    Convert currency, translate travel phrases phonetically, calculate baggage weight limits, and verify entry visa requisites on-the-go.
                  </p>
                </div>

                <button
                  id="launch-toolbox-btn"
                  onClick={() => setActiveTab("ai-tools")}
                  className="px-5 py-3 bg-sky-600 hover:bg-sky-700 dark:bg-sky dark:hover:bg-sky/80 text-white dark:text-slate-950 font-sans font-bold text-xs rounded-xl shadow-lg shadow-sky-200 dark:shadow-none flex-shrink-0 active:scale-95 transition-all"
                >
                  Launch Live Toolbox
                </button>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: ALL DESTINATIONS GRID */}
        {activeTab === "destinations" && (
          <div id="view-destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-left">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white">World Guide Catalogs</h2>
              <p className="text-xs text-gray-500 mt-1">Browse and filter verified itineraries, local dining secret hotspots, and adventure sports.</p>
            </div>

            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-850 pb-4">
              <div className="flex flex-wrap gap-1.5">
                {["All", "Beach", "Mountains", "Heritage", "Wildlife", "Spiritual"].map((cat) => (
                  <button
                    id={`grid-filter-${cat}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all ${
                      selectedCategory === cat
                        ? "bg-ocean text-white dark:bg-sky dark:text-slate-900 shadow"
                        : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-350 hover:bg-gray-50 border border-gray-100 dark:border-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {heroSearchFilters && (
                <button
                  onClick={() => setHeroSearchFilters(null)}
                  className="text-2xs font-sans text-red-500 font-bold hover:underline"
                >
                  Clear Hero Search Filter ×
                </button>
              )}
            </div>

            {/* Destination Grid */}
            <div id="catalog-grids" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onExplore={(id) => setActiveTab(`dest-${id}`)}
                  isFavorite={favoriteDestIds.includes(dest.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}

              {filteredDestinations.length === 0 && (
                <div id="grid-empty-state" className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white dark:bg-slate-900 p-12 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 text-center">
                  <Compass className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-display font-bold text-gray-700 dark:text-slate-300">No matching guides found</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Try checking spelling or choosing a different vibe filter above.
                  </p>
                </div>
              )}
            </div>

            {/* Extratools Utility box at the bottom */}
            <ExtraTools />
          </div>
        )}

        {/* VIEW: DYNAMIC DESTINATION DETAILS */}
        {activeTab.startsWith("dest-") && (() => {
          const id = activeTab.replace("dest-", "");
          const selectedDest = destinations.find((d) => d.id === id);
          if (!selectedDest) return <div className="py-12">Destination details not found.</div>;
          return (
            <DestinationDetails
              destination={selectedDest}
              onBack={handleBackToDestinations}
              isFavorite={favoriteDestIds.includes(selectedDest.id)}
              onToggleFavorite={handleToggleFavorite}
              onOpenPlannerWithDest={(name) => {
                // Pre-populate destination name in AI Trip planner
                setActiveTab("ai-tools");
              }}
              allDestinations={destinations}
              onSelectDestination={(targetId) => setActiveTab(`dest-${targetId}`)}
            />
          );
        })()}

        {/* VIEW: AI SUITE HUB */}
        {activeTab === "ai-tools" && (
          <AIPositioner
            onSaveItinerary={(saved) => {
              setSavedItineraries((prev) => [saved, ...prev]);
            }}
            savedItineraries={savedItineraries}
          />
        )}

        {/* VIEW: TRAVEL BLOG SECTION */}
        {activeTab === "blogs" && (
          <BlogSection blogs={blogs} />
        )}

        {/* VIEW: USER PROFILE DASHBOARD & JOURNAL */}
        {activeTab === "user-dashboard" && (
          <UserDashboard
            user={user}
            onChangeProfile={(newProfile) => setUser(newProfile)}
            savedItineraries={savedItineraries}
            onDeleteItinerary={(id) => {
              setSavedItineraries((prev) => prev.filter((it) => it.id !== id));
            }}
            favoriteDestIds={favoriteDestIds}
            allDestinations={destinations}
            onSelectDestination={(id) => setActiveTab(`dest-${id}`)}
            onRemoveFavorite={handleRemoveFavoriteFromDashboard}
          />
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {activeTab === "admin" && (
          <AdminDashboard
            destinations={destinations}
            onAddDestination={handleAddDestination}
            onUpdateDestination={handleUpdateDestination}
            onDeleteDestination={handleDeleteDestination}
          />
        )}

      </main>

      {/* 3. Footer Section */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Compass className="h-6 w-6 text-ocean" />
            <span className="font-display font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
              Travel Explorer Guide
            </span>
          </div>
          <p className="text-2xs font-sans text-gray-400 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            A premium full-stack travel directory offering custom seasonal weather, culinary diaries, packing optimization, and AI itinerary drafts.
          </p>
          <div className="flex justify-center space-x-4 text-3xs font-mono text-gray-400 dark:text-slate-500">
            <span>© 2026 Travel Explorer</span>
            <span>•</span>
            <span>All rights reserved</span>
            <span>•</span>
            <span>AI Studio Sandbox Build</span>
          </div>
        </div>
      </footer>

      {/* 4. Simulated Auth email modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-gray-150 dark:border-slate-850 shadow-2xl animate-scale-up text-left space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">
                  {authIsRegistering ? "Create Traveler Account" : "Sign In to Profile"}
                </h3>
                <p className="text-[10px] font-sans text-gray-500 mt-0.5">Secure sandbox environment simulation</p>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600 font-extrabold text-base px-2 py-0.5"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSimulatedAuthSubmit} className="space-y-3 text-xs font-sans">
              {authIsRegistering && (
                <div>
                  <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Liam Anderson"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="liam@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-ocean hover:bg-ocean-dark text-white rounded-xl text-xs font-bold transition-colors"
              >
                {authIsRegistering ? "Sign Up" : "Log In"}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={() => setAuthIsRegistering(!authIsRegistering)}
                className="text-3xs font-mono font-bold text-ocean dark:text-sky hover:underline"
              >
                {authIsRegistering ? "Already have an account? Sign In" : "New explorer? Register account"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
