import React, { useState } from "react";
import { 
  User, Heart, Calendar, BookOpen, Compass, Trash2, 
  Plus, Edit2, Check, Sparkles, Image, ShieldCheck, Mail
} from "lucide-react";
import { UserProfile, SavedItinerary, Destination } from "../types";

interface UserDashboardProps {
  user: UserProfile;
  onChangeProfile: (profile: UserProfile) => void;
  savedItineraries: SavedItinerary[];
  onDeleteItinerary: (id: string) => void;
  favoriteDestIds: string[];
  allDestinations: Destination[];
  onSelectDestination: (id: string) => void;
  onRemoveFavorite: (id: string) => void;
}

export default function UserDashboard({
  user,
  onChangeProfile,
  savedItineraries,
  onDeleteItinerary,
  favoriteDestIds,
  allDestinations,
  onSelectDestination,
  onRemoveFavorite,
}: UserDashboardProps) {
  const [activeSubView, setActiveSubView] = useState<"profile" | "wishlist" | "itineraries" | "journal">("profile");

  // State: Edit Profile details
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatar || "");

  // Pre-made premium traveler avatars they can click to select
  const PRESET_AVATARS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  ];

  // State: Travel Journal log
  const [journalEntries, setJournalEntries] = useState([
    {
      id: "j-1",
      title: "Chasing Sunsets in Maui Beaches",
      date: "2026-06-15",
      dest: "Maui, Hawaii",
      text: "Woke up at 4 AM to drive up Haleakala for the sunrise. Truly unforgettable. The clouds looked like a soft ocean rolling under the volcano peak. Finished the afternoon with snorkeling at Molokini Crater and eating fresh garlic butter shrimp.",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "j-2",
      title: "Temples and Bamboo forest in Kyoto",
      date: "2026-04-10",
      dest: "Kyoto, Japan",
      text: "The whispers of wind passing through the towering green bamboo of Arashiyama is therapy. We spent hours drinking matcha tea near the Zen gardens of Tenryu-ji temple. Found a hidden ramen spot with only 6 stools.",
      photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop"
    }
  ]);
  const [newJTitle, setNewJTitle] = useState("");
  const [newJDate, setNewJDate] = useState("");
  const [newJDest, setNewJDest] = useState("");
  const [newJText, setNewJText] = useState("");
  const [newJPhoto, setNewJPhoto] = useState(PRESET_AVATARS[0]);
  const [showAddJournalForm, setShowAddJournalForm] = useState(false);

  // Filter out actual favorite destination objects from IDs
  const favoriteDestinations = allDestinations.filter((d) => favoriteDestIds.includes(d.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeProfile({
      ...user,
      name: editName,
      email: editEmail,
      avatar: editAvatar
    });
    setIsEditingProfile(false);
  };

  const handleAddJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJTitle.trim() || !newJText.trim() || !newJDest.trim()) return;

    const entry = {
      id: `journal-${Date.now()}`,
      title: newJTitle,
      date: newJDate || new Date().toISOString().split("T")[0],
      dest: newJDest,
      text: newJText,
      photo: newJPhoto || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop"
    };

    setJournalEntries([entry, ...journalEntries]);
    setNewJTitle("");
    setNewJDate("");
    setNewJDest("");
    setNewJText("");
    setShowAddJournalForm(false);
  };

  const handleDeleteJournal = (id: string) => {
    setJournalEntries(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div id="user-dashboard-module" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Grid structure: Left profile summary / navigation, Right content view */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Profile Summary Card & Sidebar menu */}
        <div className="space-y-6">
          {/* Main User Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 text-center shadow-sm">
            <div className="relative inline-block">
              <img
                src={user.avatar || PRESET_AVATARS[0]}
                alt={user.name}
                className="h-20 w-20 rounded-full mx-auto object-cover border-4 border-ocean/25 dark:border-sky/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 h-4.5 w-4.5 bg-emerald-green border-2 border-white rounded-full" title="Logged in securely" />
            </div>

            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white mt-3.5 leading-tight">
              {user.name}
            </h3>
            <p className="text-3xs font-mono text-gray-400 mt-1 uppercase tracking-wider font-bold">Adventurer Tier</p>
            
            <div className="mt-4 flex items-center justify-center space-x-1.5 text-2xs text-gray-500">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>

          {/* Navigation Sidebar inside Dashboard */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-3 shadow-sm space-y-1">
            {[
              { id: "profile", label: "My Profile Settings", icon: User },
              { id: "wishlist", label: "Saved Wishlist", icon: Heart, count: favoriteDestIds.length },
              { id: "itineraries", label: "AI Saved Itineraries", icon: Sparkles, count: savedItineraries.length },
              { id: "journal", label: "My Travel Journal", icon: BookOpen, count: journalEntries.length },
            ].map((sub) => {
              const Icon = sub.icon;
              return (
                <button
                  id={`user-subview-btn-${sub.id}`}
                  key={sub.id}
                  onClick={() => setActiveSubView(sub.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all ${
                    activeSubView === sub.id
                      ? "bg-ocean/10 text-ocean dark:bg-sky/10 dark:text-sky font-extrabold"
                      : "text-gray-600 dark:text-slate-350 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{sub.label}</span>
                  </div>
                  {sub.count !== undefined && sub.count > 0 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-850 rounded text-3xs font-mono text-gray-500">
                      {sub.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Render selected sub view */}
        <div className="lg:col-span-3">
          
          {/* 1. PROFILE SETTINGS VIEW */}
          {activeSubView === "profile" && (
            <div id="subview-profile" className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
              <div className="border-b border-gray-100 dark:border-slate-800 pb-3 flex justify-between items-baseline">
                <h3 className="font-display font-extrabold text-lg text-gray-950 dark:text-white">Profile Settings</h3>
                {!isEditingProfile && (
                  <button
                    onClick={() => {
                      setEditName(user.name);
                      setEditEmail(user.email);
                      setEditAvatar(user.avatar || PRESET_AVATARS[0]);
                      setIsEditingProfile(true);
                    }}
                    className="flex items-center space-x-1 text-2xs text-ocean dark:text-sky font-bold"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit Details</span>
                  </button>
                )}
              </div>

              {!isEditingProfile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
                  <div className="p-4 bg-gray-55 dark:bg-slate-950/40 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Traveler Name</span>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{user.name}</p>
                  </div>

                  <div className="p-4 bg-gray-55 dark:bg-slate-950/40 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Account Email</span>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{user.email}</p>
                  </div>

                  <div className="p-4 bg-emerald-light/20 border border-emerald-green/10 rounded-2xl md:col-span-2 flex items-center space-x-3.5 text-left">
                    <ShieldCheck className="h-10 w-10 text-emerald-green flex-shrink-0" />
                    <div>
                      <h4 className="font-display font-bold text-emerald-green">Simulated Authentication Status</h4>
                      <p className="text-2xs font-sans text-gray-600 dark:text-slate-400 mt-0.5 leading-normal">
                        Your travel guides are securely sandboxed locally using React state hooks. Creating reviews and planning trips are active and saved inside memory variables.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Display Name</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Pick preset avatar */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-2">Change Avatar Graphic</label>
                    <div className="flex gap-3">
                      {PRESET_AVATARS.map((avUrl) => (
                        <button
                          key={avUrl}
                          type="button"
                          onClick={() => setEditAvatar(avUrl)}
                          className={`relative h-14 w-14 rounded-full overflow-hidden border-2 transition-all ${
                            editAvatar === avUrl ? "border-ocean scale-110" : "border-transparent opacity-70"
                          }`}
                        >
                          <img src={avUrl} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form actions */}
                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-500 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-ocean text-white hover:bg-ocean-dark rounded-xl text-xs font-bold"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 2. SAVED WISHLIST CARDS VIEW */}
          {activeSubView === "wishlist" && (
            <div id="subview-wishlist" className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Saved Destinations</h3>
              {favoriteDestinations.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-3xl text-center">
                  <Heart className="h-10 w-10 text-gray-350 dark:text-slate-700 mx-auto mb-3" />
                  <h4 className="font-display font-bold text-sm text-gray-700 dark:text-slate-400">Your Wishlist is Empty</h4>
                  <p className="text-xs text-gray-500 mt-1.5 max-w-xs mx-auto">
                    Browse featured world-class spots, and tap the heart icon to save itineraries on your personal portal.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteDestinations.map((dest) => (
                    <div 
                      key={dest.id} 
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex gap-4 p-3 shadow-sm hover:shadow-md transition-all text-left"
                    >
                      <img src={dest.image} alt={dest.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                      <div className="flex-grow flex flex-col justify-between min-w-0 py-1">
                        <div>
                          <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white truncate">{dest.name}</h4>
                          <p className="text-2xs text-gray-400">{dest.country} • {dest.category}</p>
                          <p className="text-2xs font-sans text-gray-600 line-clamp-2 mt-1 leading-relaxed">{dest.shortDescription}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => onSelectDestination(dest.id)}
                            className="text-2xs font-sans font-bold text-ocean dark:text-sky hover:underline"
                          >
                            Explore Guide →
                          </button>
                          <button
                            onClick={() => onRemoveFavorite(dest.id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Remove from favorites"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. AI SAVED ITINERARIES TIMELINES */}
          {activeSubView === "itineraries" && (
            <div id="subview-itineraries" className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">AI Saved Timelines ({savedItineraries.length})</h3>
              {savedItineraries.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-3xl text-center">
                  <Sparkles className="h-10 w-10 text-gray-350 dark:text-slate-750 mx-auto mb-3" />
                  <h4 className="font-display font-bold text-sm text-gray-700 dark:text-slate-400">No Saved Plans Yet</h4>
                  <p className="text-xs text-gray-500 mt-1.5 max-w-sm mx-auto">
                    Head to the AI Planner, configure your custom days/budget parameters, click Craft, then hit "Save to Profile."
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedItineraries.map((itinerary) => (
                    <div 
                      key={itinerary.id} 
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-5 shadow-sm text-left relative space-y-4"
                    >
                      <button
                        onClick={() => onDeleteItinerary(itinerary.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50/20"
                        title="Delete this itinerary"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>

                      <div>
                        <span className="text-[9px] uppercase font-mono text-gray-400 block mb-0.5">Saved on {itinerary.createdAt}</span>
                        <h4 className="font-display font-extrabold text-base text-gray-950 dark:text-white flex items-center gap-2">
                          <Compass className="h-5 w-5 text-ocean" />
                          <span>{itinerary.days}-Day timeline to {itinerary.destinationName}</span>
                        </h4>
                        <p className="text-2xs font-sans text-gray-500 mt-0.5">Style: {itinerary.style} • Expected Capital: ${itinerary.budget}/day</p>
                      </div>

                      {/* Display a compact nested grid summary of daily titles */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-50 dark:border-slate-850">
                        {itinerary.daysData?.map((d) => (
                          <div key={d.day} className="p-2.5 bg-gray-55 dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-800">
                            <span className="text-[9px] font-mono font-bold text-emerald-green uppercase block">Day {d.day}</span>
                            <p className="font-sans font-bold text-3xs text-gray-900 dark:text-white truncate mt-0.5">{d.title}</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">{d.activities?.length || 0} planned stops</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. INTERACTIVE PERSONAL TRAVEL JOURNAL */}
          {activeSubView === "journal" && (
            <div id="subview-journal" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">My Travel Log</h3>
                <button
                  onClick={() => setShowAddJournalForm(!showAddJournalForm)}
                  className="px-3 py-1.5 bg-ocean text-white rounded-xl text-2xs font-sans font-bold tracking-wide uppercase flex items-center space-x-1"
                >
                  {showAddJournalForm ? <span>Close Log</span> : <span>+ Log Entry</span>}
                </button>
              </div>

              {/* Add Entry Form overlay */}
              {showAddJournalForm && (
                <form 
                  onSubmit={handleAddJournalEntry} 
                  className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-md text-xs font-sans space-y-4"
                >
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">New Journal Entry</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Entry Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hiking through Banff snowcaps"
                        value={newJTitle}
                        onChange={(e) => setNewJTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Log Date</label>
                      <input
                        type="date"
                        value={newJDate}
                        onChange={(e) => setNewJDate(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Destination Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Banff, Canada"
                        value={newJDest}
                        onChange={(e) => setNewJDest(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Attach Photo URL</label>
                      <input
                        type="text"
                        placeholder="Image Link (or leaves blank for presets)"
                        value={newJPhoto}
                        onChange={(e) => setNewJPhoto(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">My Story</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your beautiful story details here..."
                      value={newJText}
                      onChange={(e) => setNewJText(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-55 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-ocean text-white rounded-xl text-xs font-bold"
                    >
                      Save Journal Entry
                    </button>
                  </div>
                </form>
              )}

              {/* Entries list render */}
              <div className="space-y-6">
                {journalEntries.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-3xl text-center">
                    <BookOpen className="h-10 w-10 text-gray-350 mx-auto mb-3" />
                    <h4 className="font-display font-bold text-sm text-gray-700 dark:text-slate-400">Your Journal is Empty</h4>
                    <p className="text-xs text-gray-500 mt-1.5 max-w-xs mx-auto">
                      Log your personal travel memories, stories, and images to review in the future!
                    </p>
                  </div>
                ) : (
                  journalEntries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all text-left"
                    >
                      {entry.photo && (
                        <img src={entry.photo} alt={entry.title} className="w-full md:w-52 h-44 md:h-auto object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                      )}
                      
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[9px] font-mono font-bold text-ocean uppercase block mb-0.5">{entry.date} • {entry.dest}</span>
                              <h4 className="font-display font-extrabold text-base text-gray-950 dark:text-white">{entry.title}</h4>
                            </div>
                            <button
                              onClick={() => handleDeleteJournal(entry.id)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-gray-50 dark:hover:bg-slate-800"
                              title="Delete entry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <p className="text-xs font-sans text-gray-650 dark:text-slate-300 mt-3 leading-relaxed">
                            {entry.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
