import React, { useState } from "react";
import { 
  ArrowLeft, Star, MapPin, Heart, Share2, Compass, 
  Map, PhoneCall, AlertTriangle, CloudSun, Clock, Info,
  Plane, Train, Landmark, Sparkles, Plus, Check, ExternalLink
} from "lucide-react";
import { Destination, Review, Hotel, Restaurant } from "../types";

interface DestinationDetailsProps {
  destination: Destination;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenPlannerWithDest: (destName: string) => void;
  allDestinations: Destination[];
  onSelectDestination: (id: string) => void;
}

export default function DestinationDetails({
  destination,
  onBack,
  isFavorite,
  onToggleFavorite,
  onOpenPlannerWithDest,
  allDestinations,
  onSelectDestination,
}: DestinationDetailsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "hotels" | "restaurants" | "adventure" | "guide" | "map">("overview");
  const [reviews, setReviews] = useState<Review[]>(destination.reviews);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newUserName, setNewUserName] = useState("");
  
  // Custom interactive map states
  const [mapCategory, setMapCategory] = useState<"all" | "hotels" | "restaurants" | "sights" | "amenities">("all");
  const [selectedMapPin, setSelectedMapPin] = useState<{ name: string; type: string; info: string } | null>(null);

  // Filter out current destination from related list
  const relatedDestinations = allDestinations
    .filter((d) => d.id !== destination.id)
    .slice(0, 3);

  // Handle Review Submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newUserName.trim()) return;

    const review: Review = {
      id: `rev-added-${Date.now()}`,
      user: newUserName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([review, ...reviews]);
    setNewComment("");
    setNewUserName("");
    setNewRating(5);
  };

  const mapPins = [
    { x: 30, y: 40, name: destination.attractions[0].name, type: "sights", info: `${destination.attractions[0].type} attraction` },
    { x: 70, y: 35, name: destination.attractions[1].name, type: "sights", info: `${destination.attractions[1].type} attraction` },
    { x: 50, y: 65, name: destination.attractions[2].name, type: "sights", info: `${destination.attractions[2].type} attraction` },
    { x: 40, y: 25, name: destination.hotels[0].name, type: "hotels", info: `${destination.hotels[0].location} - $${destination.hotels[0].price}/night` },
    { x: 60, y: 75, name: destination.hotels[1].name, type: "hotels", info: `${destination.hotels[1].location} - $${destination.hotels[1].price}/night` },
    { x: 25, y: 60, name: destination.restaurants[0].name, type: "restaurants", info: `${destination.restaurants[0].category} - ${destination.restaurants[0].priceRange}` },
    { x: 75, y: 55, name: destination.restaurants[1].name, type: "restaurants", info: `${destination.restaurants[1].category} - ${destination.restaurants[1].priceRange}` },
    { x: 45, y: 45, name: "City Hospital & SOS Care", type: "amenities", info: `Emergency SOS Center. Tel: ${destination.emergencyNumbers.medical}` },
    { x: 55, y: 50, name: "Central ATM & Exchange Hub", type: "amenities", info: "Multi-currency and local bank operations." },
    { x: 80, y: 20, name: "Central Metro Terminal", type: "amenities", info: "High-speed line and bus depot access points." }
  ];

  const filteredPins = mapCategory === "all" 
    ? mapPins 
    : mapPins.filter(pin => pin.type === mapCategory);

  return (
    <div id={`details-${destination.id}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in transition-colors duration-300">
      
      {/* Back & Controls Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="details-back-btn"
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-sans font-semibold text-gray-600 dark:text-slate-300 hover:text-ocean dark:hover:text-sky py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Destinations</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            id="details-fav-toggle"
            onClick={(e) => onToggleFavorite(destination.id, e)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? "bg-red-500/15 border-red-500/30 text-red-500"
                : "border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
            }`}
          >
            <Heart className="h-4.5 w-4.5 fill-current" />
          </button>
          <button
            id="details-share-btn"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Travel guide link copied to clipboard!");
            }}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            title="Share Guide"
          >
            <Share2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Hero Visual Banner Section */}
      <div className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg mb-8">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="px-3 py-1 bg-sky/35 backdrop-blur-md rounded-full text-2xs font-mono font-bold tracking-wider uppercase border border-white/20">
            {destination.category} Destination
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight mt-3">
            {destination.name}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-200 mt-1.5 flex items-center space-x-1 font-medium">
            <MapPin className="h-4 w-4 text-emerald-green" />
            <span>{destination.city}, {destination.country}</span>
            <span className="mx-2">•</span>
            <Star className="h-3.5 w-3.5 text-golden fill-current" />
            <span className="font-bold">{destination.rating.toFixed(1)} Rating</span>
          </p>
        </div>
        
        {/* Dynamic Launch Planner Quick Action */}
        <button
          id="details-plan-trip-btn"
          onClick={() => onOpenPlannerWithDest(destination.name)}
          className="absolute bottom-6 right-6 hidden md:flex items-center space-x-2 bg-gradient-to-r from-sunset to-golden hover:from-sunset-orange hover:to-sunset text-white py-2.5 px-5 rounded-full font-sans font-bold text-xs shadow-lg transition-all transform hover:scale-[1.03]"
        >
          <Sparkles className="h-4 w-4" />
          <span>Launch AI Itinerary</span>
        </button>
      </div>

      {/* Grid: Main Info tabs & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Content Hub & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation buttons */}
          <div className="flex border-b border-gray-100 dark:border-slate-800 overflow-x-auto no-scrollbar space-x-1 pb-1">
            {[
              { id: "overview", label: "Overview" },
              { id: "hotels", label: "Hotels" },
              { id: "restaurants", label: "Dining" },
              { id: "adventure", label: "Adventure" },
              { id: "guide", label: "Culture Guide" },
              { id: "map", label: "Interactive Map" },
            ].map((tab) => (
              <button
                id={`details-tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-xl font-sans font-semibold text-xs transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-ocean text-ocean dark:border-sky dark:text-sky bg-gray-50/50 dark:bg-slate-900/50"
                    : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          
          {/* 1. Overview */}
          {activeTab === "overview" && (
            <div id="tab-content-overview" className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-display font-bold text-lg text-gray-950 dark:text-white mb-3">Overview</h3>
                <p className="text-xs font-sans text-gray-600 dark:text-slate-300 leading-relaxed">
                  {destination.overview}
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Best Season</span>
                    <p className="text-xs font-sans font-bold text-gray-800 dark:text-slate-200 truncate" title={destination.bestSeason}>{destination.bestSeason.split("(")[0]}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Primary Language</span>
                    <p className="text-xs font-sans font-bold text-gray-800 dark:text-slate-200">{destination.language}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Local Currency</span>
                    <p className="text-xs font-sans font-bold text-gray-800 dark:text-slate-200">{destination.currency}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Average Daily Cost</span>
                    <p className="text-xs font-sans font-bold text-gray-800 dark:text-slate-200">${destination.averageBudget} USD</p>
                  </div>
                </div>
              </div>

              {/* Sights/Attractions Sub-Section */}
              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Top Sights & Nearby Attractions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {destination.attractions.map((attraction, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col h-full">
                      <div className="h-40 overflow-hidden relative">
                        <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white rounded text-[10px] font-mono tracking-wide uppercase">
                          {attraction.type}
                        </span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-1.5">{attraction.name}</h4>
                          <p className="text-2xs font-sans text-gray-600 dark:text-slate-400 leading-normal line-clamp-3">{attraction.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* History & Culture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <Landmark className="h-5 w-5 text-ocean dark:text-sky" />
                    <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">History</h3>
                  </div>
                  <p className="text-xs font-sans text-gray-600 dark:text-slate-300 leading-relaxed">
                    {destination.history}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <Compass className="h-5 w-5 text-emerald-green" />
                    <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Culture & Arts</h3>
                  </div>
                  <p className="text-xs font-sans text-gray-600 dark:text-slate-300 leading-relaxed">
                    {destination.culture}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Hotels section */}
          {activeTab === "hotels" && (
            <div id="tab-content-hotels" className="space-y-4">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Recommended Stays</h3>
                <span className="text-xs font-sans text-gray-400 font-medium">Verified partnerships and guest ratings</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-sans font-bold text-ocean dark:text-sky shadow">
                          ${hotel.price}/night
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/50 px-2 py-0.5 rounded-full text-2xs text-white font-bold">
                          <Star className="h-3 w-3 text-golden fill-current" />
                          <span>{hotel.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-display font-bold text-base text-gray-950 dark:text-white mb-1">{hotel.name}</h4>
                        <p className="text-2xs font-sans text-gray-400 mb-3">{hotel.location}</p>
                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 rounded text-[10px] font-sans text-gray-600 dark:text-slate-300 border border-gray-100 dark:border-slate-700">
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <span className="px-1.5 py-0.5 bg-gray-50 dark:bg-slate-800 rounded text-[10px] text-gray-400">+{hotel.amenities.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => alert(`Room booking requested at ${hotel.name}! An agent will email confirmation details.`)}
                        className={`w-full py-2 rounded-xl text-xs font-sans font-bold transition-all ${
                          hotel.availability 
                            ? "bg-ocean hover:bg-ocean-dark text-white dark:bg-sky dark:hover:bg-sky/80 dark:text-slate-900 shadow-md"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!hotel.availability}
                      >
                        {hotel.availability ? "Book Room Now" : "No Availability"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Dining Guide */}
          {activeTab === "restaurants" && (
            <div id="tab-content-restaurants" className="space-y-4">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Culinary Secrets</h3>
                <span className="text-xs font-sans text-gray-400 font-medium">Fine Dining, cafes and authentic street tastes</span>
              </div>
              <div className="space-y-4">
                {destination.restaurants.map((rest) => (
                  <div key={rest.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition-all">
                    <img src={rest.image} alt={rest.name} className="w-full sm:w-36 h-36 sm:h-28 rounded-xl object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                    <div className="w-full flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-display font-bold text-base text-gray-950 dark:text-white flex items-center gap-2">
                              {rest.name}
                              <span className="px-2 py-0.5 bg-emerald-light dark:bg-emerald-dark/30 text-emerald-green rounded text-[9px] font-sans font-bold uppercase tracking-wide">
                                {rest.category}
                              </span>
                            </h4>
                            <p className="text-2xs font-sans text-gray-400">{rest.distance} • Open: {rest.openingHours}</p>
                          </div>
                          <div className="flex items-center space-x-1 bg-gray-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 dark:text-slate-200">
                            <Star className="h-3.5 w-3.5 text-golden fill-current" />
                            <span>{rest.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="mt-2.5">
                          <span className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Highlight Dishes:</span>
                          <div className="flex flex-wrap gap-1">
                            {rest.menuHighlights.map((dish, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-55 dark:bg-slate-800 rounded text-[10px] font-sans text-gray-600 dark:text-slate-300">
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 sm:mt-0 flex items-center justify-end">
                        <a 
                          href={rest.googleMapsLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center space-x-1 text-2xs font-sans font-bold text-ocean hover:text-ocean-dark dark:text-sky dark:hover:text-sky/80 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Google Maps Link</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Adventure Activities */}
          {activeTab === "adventure" && (
            <div id="tab-content-adventure" className="space-y-4">
              <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Adventure & Outdoor Expeditions</h3>
              <div className="grid grid-cols-1 gap-6">
                {destination.activities.map((act) => (
                  <div key={act.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all">
                    <img src={act.image} alt={act.name} className="w-full md:w-56 h-48 md:h-auto object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <h4 className="font-display font-bold text-base text-gray-950 dark:text-white">{act.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wide ${
                            act.difficulty === "Easy" ? "bg-emerald-light text-emerald-green" :
                            act.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-50 text-red-600"
                          }`}>
                            {act.difficulty} Difficulty
                          </span>
                        </div>
                        <p className="text-xs font-sans text-gray-600 dark:text-slate-300 leading-relaxed mb-4">{act.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans pt-3 border-t border-gray-50 dark:border-slate-800">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-gray-400">Duration</span>
                            <p className="font-semibold text-gray-800 dark:text-slate-200">{act.duration}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-gray-400">Estimated Cost</span>
                            <p className="font-semibold text-gray-800 dark:text-slate-200">${act.cost} USD</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-gray-400">Safety Level</span>
                            <p className="font-semibold text-gray-800 dark:text-slate-200">{act.safetyLevel}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-gray-400">Required Gear</span>
                            <p className="font-semibold text-gray-800 dark:text-slate-200 truncate" title={act.requiredEquipment.join(", ")}>
                              {act.requiredEquipment[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Culture & Local Guide */}
          {activeTab === "guide" && (
            <div id="tab-content-guide" className="space-y-6">
              <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Local Customs & Traditions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditions & Etiquette */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">Customs & Respect Guidelines</h4>
                  <ul className="space-y-2.5">
                    {destination.localGuide.traditions.map((trad, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-600 dark:text-slate-300">
                        <Check className="h-4.5 w-4.5 text-emerald-green flex-shrink-0 mt-0.5" />
                        <span>{trad}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white pt-3 border-t border-gray-50 dark:border-slate-800">Dress Etiquette</h4>
                  <p className="text-xs text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-950 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                    {destination.localGuide.dressCode}
                  </p>
                </div>

                {/* Important Phrases & Safety */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">Essential Local Vocabulary</h4>
                  <div className="space-y-3">
                    {destination.localGuide.phrases.map((phr, idx) => (
                      <div key={idx} className="p-2.5 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-100 dark:border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-sans font-bold text-gray-900 dark:text-white">{phr.phrase}</p>
                          <span className="text-[10px] font-sans text-gray-500">"{phr.translation}"</span>
                        </div>
                        <span className="text-2xs font-mono text-ocean dark:text-sky bg-ocean/5 dark:bg-sky/5 px-2 py-0.5 rounded border border-ocean/10">
                          {phr.pronunciation}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white pt-3 border-t border-gray-50 dark:border-slate-800">Official Safety Advice</h4>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
                    {destination.localGuide.safetyAdvice.map((safe, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-golden flex-shrink-0 mt-0.5" />
                        <span>{safe}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 6. Interactive Custom Map */}
          {activeTab === "map" && (
            <div id="tab-content-map" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white">Interactive Map Guide</h3>
                  <p className="text-xs font-sans text-gray-400">Explore clickable pins of sights, accommodations, restaurants, and medical support centers.</p>
                </div>

                {/* Map category filters */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: "all", label: "Show All" },
                    { id: "sights", label: "Sights" },
                    { id: "hotels", label: "Hotels" },
                    { id: "restaurants", label: "Food" },
                    { id: "amenities", label: "Services" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setMapCategory(cat.id as any); setSelectedMapPin(null); }}
                      className={`px-2.5 py-1 rounded-lg text-3xs font-mono font-bold uppercase transition-all ${
                        mapCategory === cat.id
                          ? "bg-ocean text-white dark:bg-sky dark:text-slate-950"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Illustration Area */}
              <div className="relative w-full h-[360px] bg-slate-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                {/* SVG illustrated map style background */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Water elements */}
                  <rect width="100%" height="100%" fill={mapCategory === "all" ? "#f1f5f9" : "#f8fafc"} className="dark:hidden" />
                  <rect width="100%" height="100%" fill="#0f172a" className="hidden dark:block" />
                  
                  {/* Styled abstract land elements */}
                  <path d="M100 150 Q 200 80 400 180 T 800 150 T 1200 200 L 1200 400 L 0 400 Z" fill="#e2e8f0" className="dark:fill-slate-900/60" opacity="0.7" />
                  <path d="M0 300 Q 300 250 600 350 T 1200 300 L 1200 400 L 0 400 Z" fill="#cbd5e1" className="dark:fill-slate-800/40" opacity="0.8" />
                  <circle cx="200" cy="120" r="80" fill="#38bdf8" opacity="0.1" />
                  <circle cx="850" cy="280" r="120" fill="#059669" opacity="0.05" />

                  {/* Decorative roads */}
                  <path d="M 0 100 Q 400 120 1200 80" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
                  <path d="M 150 0 Q 300 200 250 400" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.3" />
                  <path d="M 700 0 L 700 400" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.3" />
                </svg>

                {/* Overlay pins */}
                {filteredPins.map((pin, index) => {
                  const isSelected = selectedMapPin?.name === pin.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedMapPin(pin)}
                      className="absolute group z-10 transition-transform duration-300 transform hover:scale-125 focus:outline-none"
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                      <div className={`p-1.5 rounded-full shadow-md flex items-center justify-center ${
                        pin.type === "sights" ? "bg-emerald-green text-white" :
                        pin.type === "hotels" ? "bg-ocean text-white dark:bg-sky dark:text-slate-900" :
                        pin.type === "restaurants" ? "bg-sunset text-white" :
                        "bg-red-500 text-white"
                      } ${isSelected ? "ring-4 ring-offset-2 ring-blue-500 scale-125" : ""}`}>
                        <MapPin className="h-4.5 w-4.5" />
                      </div>
                      
                      {/* Floating hover name */}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-8 bg-black/85 text-white px-2 py-0.5 rounded font-sans text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                        {pin.name}
                      </span>
                    </button>
                  );
                })}

                {/* Selected Pin Popup card */}
                {selectedMapPin && (
                  <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-800 z-20 animate-slide-up">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-[8px] uppercase font-mono font-bold tracking-wide px-1.5 py-0.5 rounded ${
                          selectedMapPin.type === "sights" ? "bg-emerald-light text-emerald-green" :
                          selectedMapPin.type === "hotels" ? "bg-sky-light text-ocean" :
                          selectedMapPin.type === "restaurants" ? "bg-orange-50 text-sunset" :
                          "bg-red-50 text-red-500"
                        }`}>
                          {selectedMapPin.type}
                        </span>
                        <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mt-1.5">{selectedMapPin.name}</h4>
                        <p className="text-2xs font-sans text-gray-500 mt-1">{selectedMapPin.info}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedMapPin(null)} 
                        className="text-gray-400 hover:text-gray-600 text-xs font-bold px-1.5 py-0.5"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col Sidebar: Local Weather, Quick Transport & Emergency Info */}
        <div className="space-y-6">
          {/* Weather card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-gray-950 dark:text-white flex items-center space-x-1.5">
                <CloudSun className="h-5 w-5 text-golden" />
                <span>Local Weather Forecast</span>
              </h3>
              <span className="text-[10px] uppercase font-mono text-emerald-green font-bold">AQI {destination.coordinates.lat > 0 ? "35 (Good)" : "12 (Excellent)"}</span>
            </div>

            <div className="flex items-center justify-between bg-gray-50/50 dark:bg-slate-950/50 p-3 rounded-xl border border-gray-100 dark:border-slate-800 mb-4">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono text-gray-400">Current Temp</span>
                <p className="font-display font-black text-3xl text-gray-900 dark:text-white">72°F <span className="text-xs font-normal">/ 22°C</span></p>
                <span className="text-2xs text-gray-500 font-sans">Scattered Sunshine</span>
              </div>
              <div className="text-right text-2xs font-sans text-gray-500 space-y-1">
                <p>Humidity: 58%</p>
                <p>Wind: 8 mph</p>
                <p>Rain Prob: 10%</p>
              </div>
            </div>

            {/* 4 Day horizontal forecast list */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-mono text-gray-400 block mb-1">Upcoming 4-Day Forecast</span>
              {[
                { day: "Tue", temp: "74°F / 58°F", condition: "Sunny" },
                { day: "Wed", temp: "72°F / 56°F", condition: "Rainy (60%)" },
                { day: "Thu", temp: "75°F / 57°F", condition: "Partly Cloudy" },
                { day: "Fri", temp: "78°F / 59°F", condition: "Sunny & Warm" },
              ].map((dayCast, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-sans text-gray-600 dark:text-slate-300 py-1 border-b border-gray-50 dark:border-slate-800/50 last:border-0">
                  <span className="font-bold w-10">{dayCast.day}</span>
                  <span className="text-2xs">{dayCast.condition}</span>
                  <span className="font-mono text-2xs text-gray-500">{dayCast.temp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Transportation Options */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-gray-950 dark:text-white flex items-center space-x-1.5">
              <Plane className="h-5 w-5 text-ocean" />
              <span>Transit & Getting Around</span>
            </h3>

            <div className="space-y-3">
              {destination.transportation.map((trans, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className="p-1.5 bg-gray-50 dark:bg-slate-800 rounded-lg text-ocean dark:text-sky">
                    {trans.type === "Flights" || trans.type === "Taxi" ? <Plane className="h-4 w-4" /> : <Train className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans font-bold text-gray-900 dark:text-white leading-normal">{trans.type}</p>
                    <p className="text-2xs font-sans text-gray-500 line-clamp-2 mt-0.5">{trans.description}</p>
                    <div className="flex space-x-2 text-[9px] font-mono text-gray-400 mt-1">
                      <span>Time: {trans.travelTime}</span>
                      <span>•</span>
                      <span>Cost: {trans.estimatedCost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency SOS & Helplines */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-red-100 dark:border-red-950 shadow-sm space-y-3.5">
            <h3 className="font-display font-bold text-sm text-red-600 dark:text-red-400 flex items-center space-x-1.5">
              <PhoneCall className="h-5 w-5 animate-bounce" />
              <span>Emergency SOS & Contacts</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-sans">
              <div className="p-2 bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-100/40">
                <span className="text-[8px] uppercase font-mono text-red-500 font-bold block mb-0.5">Police</span>
                <span className="font-mono font-extrabold text-gray-900 dark:text-slate-200">{destination.emergencyNumbers.police}</span>
              </div>
              <div className="p-2 bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-100/40">
                <span className="text-[8px] uppercase font-mono text-red-500 font-bold block mb-0.5">Ambulance</span>
                <span className="font-mono font-extrabold text-gray-900 dark:text-slate-200">{destination.emergencyNumbers.medical}</span>
              </div>
              <div className="p-2 bg-red-50/50 dark:bg-red-950/20 rounded-xl border border-red-100/40">
                <span className="text-[8px] uppercase font-mono text-red-500 font-bold block mb-0.5">Tourist SOS</span>
                <span className="font-mono font-extrabold text-gray-900 dark:text-slate-200 truncate">{destination.emergencyNumbers.touristSOS.split("-")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Reviews & Comments */}
      <section id="reviews-section" className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
        <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white mb-6">Traveler Reviews ({reviews.length})</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Write a review */}
          <div className="bg-gray-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 h-fit">
            <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white mb-4 flex items-center space-x-1">
              <Compass className="h-4.5 w-4.5 text-ocean" />
              <span>Share Your Experience</span>
            </h4>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Anderson"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-sans focus:ring-1 focus:ring-ocean"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Star Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 text-golden hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star className={`h-5 w-5 ${newRating >= star ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Your Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell other travelers about your stay, food recommendations, and budget tips..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-sans focus:ring-1 focus:ring-ocean"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-ocean hover:bg-ocean-dark text-white rounded-xl text-xs font-sans font-bold shadow transition-all transform hover:scale-[1.01]"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* List reviews */}
          <div className="lg:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 border-b border-gray-50 dark:border-slate-800 last:border-0 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-sans font-bold text-xs text-gray-950 dark:text-white">{rev.user}</span>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-3 w-3 text-golden ${rev.rating >= star ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-sans text-gray-600 dark:text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related/Explore Next Destinations */}
      <div className="mt-12 text-left">
        <h3 className="font-display font-extrabold text-xl text-gray-950 dark:text-white mb-6">Explore Related Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedDestinations.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectDestination(rel.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="font-display font-bold text-sm text-shadow">{rel.name}</h4>
                  <span className="text-[10px] text-gray-200 text-shadow">{rel.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
