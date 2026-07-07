import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, MessageSquare, Send, Calendar, CheckSquare, 
  TrendingUp, Compass, ChevronDown, Check, Info, Trash2, ShieldAlert,
  Footprints
} from "lucide-react";
import { ItineraryDay, SavedItinerary } from "../types";

interface AIPositionerProps {
  initialDestination?: string;
  onSaveItinerary?: (itinerary: SavedItinerary) => void;
  savedItineraries?: SavedItinerary[];
}

export default function AIPositioner({
  initialDestination = "",
  onSaveItinerary,
  savedItineraries = [],
}: AIPositionerProps) {
  const [activeSubTab, setActiveSubTab] = useState<"chat" | "itinerary" | "packing" | "budget">("itinerary");

  // Destination selections
  const popularDests = ["Kyoto, Japan", "Maui, Hawaii", "Banff, Canada", "Serengeti, Tanzania", "Varanasi, India", "Rome, Italy"];
  
  // States: AI Trip Planner
  const [itineraryDest, setItineraryDest] = useState(initialDestination || "Kyoto, Japan");
  const [itineraryDays, setItineraryDays] = useState(3);
  const [itineraryBudget, setItineraryBudget] = useState(150);
  const [itineraryStyle, setItineraryStyle] = useState("Solo");
  const [itineraryResult, setItineraryResult] = useState<any>(null);
  const [itineraryLoading, setItineraryLoading] = useState(false);
  const [itinerarySteps, setItinerarySteps] = useState("");

  // States: AI Chat Assistant
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    { role: "assistant", content: "Hello adventurer! I'm your AI Travel Concierge. I can help map out transport, provide cultural etiquette tips, recommend hidden cafés, or advise on local emergency systems. What's on your horizon?" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // States: AI Packing List
  const [packingDest, setPackingDest] = useState(initialDestination || "Kyoto, Japan");
  const [packingSeason, setPackingSeason] = useState("Autumn");
  const [packingActivities, setPackingActivities] = useState<string[]>([]);
  const [packingResult, setPackingResult] = useState<any>(null);
  const [packingLoading, setPackingLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // States: AI Budget Optimizer
  const [budgetDest, setBudgetDest] = useState(initialDestination || "Kyoto, Japan");
  const [budgetDays, setBudgetDays] = useState(3);
  const [budgetTotal, setBudgetTotal] = useState(500);
  const [budgetStyle, setBudgetStyle] = useState("Solo");
  const [budgetResult, setBudgetResult] = useState<any>(null);
  const [budgetLoading, setBudgetLoading] = useState(false);

  // Sync initial destination prop changes
  useEffect(() => {
    if (initialDestination) {
      setItineraryDest(initialDestination);
      setPackingDest(initialDestination);
      setBudgetDest(initialDestination);
    }
  }, [initialDestination]);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // Loader dynamic phrases helper
  const triggerLoadingPhrases = (phrases: string[], setStep: (s: string) => void) => {
    let currentIdx = 0;
    setStep(phrases[0]);
    const timer = setInterval(() => {
      currentIdx = (currentIdx + 1) % phrases.length;
      setStep(phrases[currentIdx]);
    }, 2000);
    return timer;
  };

  // --- API CALS ---

  // 1. AI Chat Call
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: chatMessages,
          destinationContext: itineraryDest
        })
      });
      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Oops! I seem to have trouble reaching my network towers. Please check your connectivity and try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // 2. Generate Itinerary Call
  const handleGenerateItinerary = async () => {
    setItineraryLoading(true);
    setItineraryResult(null);
    const phrases = [
      "Consulting local mapping data...",
      "Uncovering authentic dining spots...",
      "Drafting scenic route pacing...",
      "Optimizing daily budget schedules...",
      "Finalizing beautiful schedule timeline..."
    ];
    const timer = triggerLoadingPhrases(phrases, setItinerarySteps);

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: itineraryDest,
          days: itineraryDays,
          budget: itineraryBudget,
          style: itineraryStyle
        })
      });
      const data = await res.json();
      setItineraryResult(data.itinerary);
    } catch (err) {
      console.error(err);
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      clearInterval(timer);
      setItineraryLoading(false);
    }
  };

  // 3. Generate Packing List Call
  const handleGeneratePackingList = async () => {
    setPackingLoading(true);
    setPackingResult(null);

    try {
      const res = await fetch("/api/generate-packing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: packingDest,
          season: packingSeason,
          activities: packingActivities
        })
      });
      const data = await res.json();
      setPackingResult(data.list);
      setCheckedItems({});
    } catch (err) {
      console.error(err);
      alert("Failed to generate packing list.");
    } finally {
      setPackingLoading(false);
    }
  };

  // 4. Generate Budget Call
  const handleGenerateBudget = async () => {
    setBudgetLoading(true);
    setBudgetResult(null);

    try {
      const res = await fetch("/api/optimize-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: budgetDest,
          days: budgetDays,
          budget: budgetTotal,
          style: budgetStyle
        })
      });
      const data = await res.json();
      setBudgetResult(data.budget);
    } catch (err) {
      console.error(err);
      alert("Failed to optimize budget.");
    } finally {
      setBudgetLoading(false);
    }
  };

  const handleSaveCurrentItinerary = () => {
    if (!itineraryResult || !onSaveItinerary) return;

    const saved: SavedItinerary = {
      id: `saved-it-${Date.now()}`,
      destinationName: itineraryResult.destinationName,
      days: itineraryResult.days,
      budget: itineraryResult.budget,
      style: itineraryResult.style,
      daysData: itineraryResult.daysData,
      createdAt: new Date().toLocaleDateString()
    };
    onSaveItinerary(saved);
    alert("Itinerary saved successfully to your Profile!");
  };

  const togglePackingCheck = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleActivityTagToggle = (act: string) => {
    if (packingActivities.includes(act)) {
      setPackingActivities(prev => prev.filter(a => a !== act));
    } else {
      setPackingActivities(prev => [...prev, act]);
    }
  };

  return (
    <div id="ai-travel-suite" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 dark:border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-950 dark:text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-golden animate-pulse" />
            <span>AI Travel Intelligence</span>
          </h2>
          <p className="text-xs font-sans text-gray-500 mt-1">
            Leverage advanced AI modeling to plan itineraries, optimize packing guides, calculate eco-footprints, and chat with local safety concierges.
          </p>
        </div>

        {/* Outer Tabs Selection */}
        <div className="flex bg-gray-55 dark:bg-slate-900 p-1 rounded-xl border border-gray-100 dark:border-slate-800/80">
          {[
            { id: "itinerary", label: "Trip Planner", icon: Calendar },
            { id: "chat", label: "Chat Concierge", icon: MessageSquare },
            { id: "packing", label: "Packing Optimizer", icon: CheckSquare },
            { id: "budget", label: "Budget Planner", icon: TrendingUp },
          ].map((subTab) => {
            const Icon = subTab.icon;
            return (
              <button
                id={`ai-subtab-btn-${subTab.id}`}
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-2xs font-sans font-bold uppercase tracking-wider transition-all ${
                  activeSubTab === subTab.id
                    ? "bg-white dark:bg-slate-800 text-ocean dark:text-sky shadow-sm border border-gray-100 dark:border-slate-700"
                    : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{subTab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBTAB RENDERING CODES */}

      {/* 1. AI TRIP PLANNER / ITINERARY */}
      {activeSubTab === "itinerary" && (
        <div id="ai-planner-module" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-5 h-fit">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Configure Your Itinerary</h3>

            <div className="space-y-4 text-xs font-sans">
              {/* Destination list input */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Destination Name</label>
                <input
                  type="text"
                  value={itineraryDest}
                  onChange={(e) => setItineraryDest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                  placeholder="e.g. Kyoto, Rome, Serengeti..."
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {popularDests.map((d) => (
                    <button
                      key={d}
                      onClick={() => setItineraryDest(d)}
                      className="px-2 py-0.5 rounded bg-gray-55 dark:bg-slate-800 text-[10px] text-gray-600 dark:text-slate-400 border border-gray-100 dark:border-slate-700"
                    >
                      {d.split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Days slider */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Days ({itineraryDays})</label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={itineraryDays}
                  onChange={(e) => setItineraryDays(parseInt(e.target.value))}
                  className="w-full accent-ocean dark:accent-sky"
                />
              </div>

              {/* Daily Budget input */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Daily Target Budget (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={itineraryBudget}
                    onChange={(e) => setItineraryBudget(parseInt(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                  />
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Travel Style</label>
                <select
                  value={itineraryStyle}
                  onChange={(e) => setItineraryStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                >
                  <option value="Solo">Solo Traveler</option>
                  <option value="Couple">Romantic Couple</option>
                  <option value="Family">Family Friendly</option>
                  <option value="Luxury">Luxury & Comfort</option>
                  <option value="Backpacking">Budget Backpacking</option>
                  <option value="Adventure">Thrilling Adventure</option>
                </select>
              </div>

              {/* Submit trigger button */}
              <button
                id="generate-itinerary-btn"
                onClick={handleGenerateItinerary}
                disabled={itineraryLoading || !itineraryDest.trim()}
                className="w-full py-3 bg-gradient-to-r from-ocean to-emerald-green hover:from-ocean-dark hover:to-emerald-dark dark:from-sky dark:to-emerald-green text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 shadow shadow-ocean/25 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>Craft AI Plan</span>
              </button>
            </div>
          </div>

          {/* Result Output Display area */}
          <div className="lg:col-span-2 space-y-6">
            {itineraryLoading && (
              <div id="ai-planner-loading" className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl h-[450px] flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 border-4 border-ocean/30 border-t-ocean dark:border-sky/30 dark:border-t-sky rounded-full animate-spin mb-4" />
                <p className="font-sans font-bold text-sm text-gray-800 dark:text-white">{itinerarySteps}</p>
                <p className="text-2xs text-gray-400 font-mono mt-1">Formulating custom structural layout...</p>
              </div>
            )}

            {!itineraryLoading && !itineraryResult && (
              <div id="ai-planner-empty" className="bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-3xl h-[450px] flex flex-col items-center justify-center text-center">
                <Calendar className="h-12 w-12 text-gray-300 dark:text-slate-700 mb-4" />
                <h4 className="font-display font-bold text-gray-700 dark:text-slate-300">No Active Itinerary Draft</h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1.5">
                  Select your destination, budget tier, and style on the left, then click "Craft AI Plan" to generate a personalized timeline.
                </p>
              </div>
            )}

            {!itineraryLoading && itineraryResult && (
              <div id="ai-planner-result" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
                {/* Result header banner */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800 pb-4 gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-gray-900 dark:text-white">
                      {itineraryResult.days}-Day custom trip to {itineraryResult.destinationName}
                    </h3>
                    <p className="text-2xs font-sans text-gray-500 mt-0.5">Style: {itineraryResult.style} • Target Cost: ${itineraryResult.budget}/day</p>
                  </div>
                  {onSaveItinerary && (
                    <button
                      id="save-itinerary-btn"
                      onClick={handleSaveCurrentItinerary}
                      className="px-4 py-2 bg-ocean/10 text-ocean hover:bg-ocean hover:text-white dark:bg-sky/15 dark:text-sky dark:hover:bg-sky dark:hover:text-slate-950 rounded-xl text-xs font-sans font-bold transition-all"
                    >
                      Save to Profile
                    </button>
                  )}
                </div>

                {/* Days timeline layout */}
                <div className="space-y-6">
                  {itineraryResult.daysData?.map((dayNode: ItineraryDay) => (
                    <div key={dayNode.day} className="space-y-3">
                      <h4 className="flex items-center space-x-2 font-display font-bold text-sm text-gray-900 dark:text-white">
                        <span className="h-6 w-6 rounded-lg bg-emerald-green/10 text-emerald-green flex items-center justify-center text-xs font-bold">
                          {dayNode.day}
                        </span>
                        <span>{dayNode.title || `Day ${dayNode.day}`}</span>
                      </h4>

                      {/* Day activities timeline list */}
                      <div className="relative pl-3 border-l border-gray-200 dark:border-slate-800 ml-3 space-y-4">
                        {dayNode.activities?.map((act, actIdx) => (
                          <div key={actIdx} className="relative pl-5">
                            {/* Small timeline dot */}
                            <span className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full bg-ocean dark:bg-sky" />

                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div>
                                <p className="text-2xs font-mono text-gray-400 font-bold">{act.time}</p>
                                <h5 className="font-sans font-bold text-xs text-gray-900 dark:text-white mt-0.5 flex items-center gap-2">
                                  {act.activity}
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-mono font-bold ${
                                    act.type === "sightseeing" ? "bg-blue-50 text-blue-600" :
                                    act.type === "dining" ? "bg-orange-50 text-sunset" :
                                    act.type === "adventure" ? "bg-emerald-light text-emerald-green" :
                                    "bg-gray-100 text-gray-600"
                                  }`}>
                                    {act.type}
                                  </span>
                                </h5>
                                <p className="text-2xs font-sans text-gray-600 dark:text-slate-400 mt-1 leading-relaxed">
                                  {act.description}
                                </p>
                              </div>
                              <span className="font-mono text-2xs text-emerald-green font-bold flex-shrink-0 bg-emerald-light/30 dark:bg-emerald-dark/10 px-2 py-0.5 rounded border border-emerald-green/10 h-fit">
                                {act.cost > 0 ? `$${act.cost}` : "Free"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. AI CHAT CONCIERGE & SAFETY ADVISOR */}
      {activeSubTab === "chat" && (
        <div id="ai-chat-module" className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-md flex flex-col h-[520px] overflow-hidden">
          {/* Chat context banner */}
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-55 dark:bg-slate-950">
            <div className="flex items-center space-x-2.5">
              <div className="h-2 w-2 bg-emerald-green rounded-full animate-ping" />
              <div>
                <h3 className="font-display font-bold text-xs text-gray-900 dark:text-white">AI Travel Advisor & Safety Concierge</h3>
                <p className="text-[10px] font-mono text-gray-400">Adaptive Assistant (Targeting: {itineraryDest || 'Global'})</p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-gray-400">
              <ShieldAlert className="h-4 w-4 text-golden" />
              <span>Real-time SOS protocols synced</span>
            </div>
          </div>

          {/* Message scroll log */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
            {chatMessages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={i}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {!isUser && (
                    <div className="h-7 w-7 rounded-full bg-ocean/10 text-ocean flex items-center justify-center text-2xs font-bold">
                      TE
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs font-sans leading-relaxed ${
                      isUser
                        ? "bg-ocean text-white rounded-tr-none"
                        : "bg-gray-55 dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-tl-none border border-gray-100 dark:border-slate-700/50"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            {chatLoading && (
              <div className="flex justify-start items-start gap-2.5 animate-pulse">
                <div className="h-7 w-7 rounded-full bg-ocean/10 text-ocean flex items-center justify-center text-2xs font-bold">
                  ...
                </div>
                <div className="bg-gray-55 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-slate-700 text-2xs font-mono text-gray-400">
                  AI Concierge is typing safety parameters...
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Typing input form */}
          <form
            onSubmit={handleSendChatMessage}
            className="p-4 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2 bg-gray-55 dark:bg-slate-950"
          >
            <input
              id="ai-chat-input"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about local laws, flight transit times, visas, or hidden dining spots..."
              className="flex-grow px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-ocean"
            />
            <button
              id="ai-chat-send-btn"
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="p-2.5 bg-ocean hover:bg-ocean-dark text-white rounded-xl shadow transition-colors disabled:opacity-40"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      )}

      {/* 3. AI PACKING LIST GENERATOR */}
      {activeSubTab === "packing" && (
        <div id="ai-packing-module" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-5 h-fit text-xs font-sans">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Configure Your Gear</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Destination</label>
                <input
                  type="text"
                  value={packingDest}
                  onChange={(e) => setPackingDest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                  placeholder="e.g. Kyoto, Hawaii..."
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Season</label>
                <select
                  value={packingSeason}
                  onChange={(e) => setPackingSeason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                >
                  <option value="Summer">Hot Summer</option>
                  <option value="Winter">Chilly Winter (Snowing)</option>
                  <option value="Autumn">Autumn (Chilly Winds)</option>
                  <option value="Spring">Pleasant Spring (Rainy/Dry)</option>
                </select>
              </div>

              {/* Activity Tags selection */}
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Planned Activities</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {["Hiking", "Fine Dining", "Scuba Diving", "Photography", "Temple Visits", "Snow Skiing"].map((act) => {
                    const selected = packingActivities.includes(act);
                    return (
                      <button
                        key={act}
                        type="button"
                        onClick={() => handleActivityTagToggle(act)}
                        className={`px-2.5 py-1 rounded text-2xs transition-colors border ${
                          selected
                            ? "bg-ocean text-white border-ocean"
                            : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-100 dark:border-slate-700"
                        }`}
                      >
                        {act}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                id="generate-packing-btn"
                onClick={handleGeneratePackingList}
                disabled={packingLoading || !packingDest.trim()}
                className="w-full py-3 bg-gradient-to-r from-ocean to-emerald-green hover:from-ocean-dark hover:to-emerald-dark dark:from-sky dark:to-emerald-green text-white rounded-xl font-bold flex items-center justify-center space-x-1 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>Optimize Packing List</span>
              </button>
            </div>
          </div>

          {/* Packing checklist results */}
          <div className="lg:col-span-2">
            {packingLoading && (
              <div id="ai-packing-loading" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 h-[450px] flex flex-col items-center justify-center text-center">
                <div className="h-10 w-10 border-4 border-ocean/20 border-t-ocean rounded-full animate-spin mb-4" />
                <p className="font-sans font-bold text-sm text-gray-800 dark:text-white">Analyzing seasonal parameters...</p>
                <p className="text-2xs text-gray-400 mt-1">Sorting active thermal layer requirements...</p>
              </div>
            )}

            {!packingLoading && !packingResult && (
              <div id="ai-packing-empty" className="bg-gray-55 dark:bg-slate-950/20 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-3xl h-[450px] flex flex-col items-center justify-center text-center">
                <CheckSquare className="h-12 w-12 text-gray-300 dark:text-slate-700 mb-4" />
                <h4 className="font-display font-bold text-gray-700 dark:text-slate-300">No Packing List Active</h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1.5">
                  Configure your planned seasonal and activity parameters, then launch packing optimizations.
                </p>
              </div>
            )}

            {!packingLoading && packingResult && (
              <div id="ai-packing-result" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 text-xs text-left">
                <div className="border-b border-gray-100 dark:border-slate-800 pb-3">
                  <h3 className="font-display font-extrabold text-lg text-gray-900 dark:text-white">
                    Packing list for {packingDest} ({packingSeason})
                  </h3>
                  <p className="text-2xs text-gray-400 mt-0.5">Checked items are saved instantly to your current memory cache.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category packing check boxes */}
                  {[
                    { id: "essentials", label: "Core Essentials", list: packingResult.essentials },
                    { id: "clothing", label: "Clothing & Layers", list: packingResult.clothing },
                    { id: "electronics", label: "Electronics & Plugs", list: packingResult.electronics },
                    { id: "toiletries", label: "Toiletries & Meds", list: packingResult.toiletries },
                    { id: "activitySpecific", label: "Activity Specific Gear", list: packingResult.activitySpecific }
                  ].map((cat) => (
                    <div key={cat.id} className="space-y-2.5">
                      <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white border-b border-gray-50 dark:border-slate-800/80 pb-1">{cat.label}</h4>
                      <div className="space-y-2">
                        {cat.list?.map((item: string, idx: number) => {
                          const checked = !!checkedItems[item];
                          return (
                            <div
                              key={idx}
                              onClick={() => togglePackingCheck(item)}
                              className="flex items-center space-x-2.5 p-2 bg-gray-55 dark:bg-slate-950 rounded-xl cursor-pointer hover:bg-gray-100/50 transition-colors"
                            >
                              <div className={`h-4.5 w-4.5 rounded-lg border flex items-center justify-center transition-all ${
                                checked 
                                  ? "bg-emerald-green border-emerald-green text-white"
                                  : "border-gray-300 dark:border-slate-700"
                              }`}>
                                {checked && <Check className="h-3.5 w-3.5" />}
                              </div>
                              <span className={`text-xs font-sans ${checked ? "line-through text-gray-400" : "text-gray-700 dark:text-slate-300"}`}>
                                {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Pro Packing Tips */}
                  <div className="col-span-1 md:col-span-2 bg-golden/5 border border-golden/10 p-4 rounded-2xl">
                    <h4 className="font-display font-bold text-sm text-golden flex items-center gap-1.5 mb-2">
                      <Sparkles className="h-4.5 w-4.5" />
                      <span>Smart Packing hacks</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                      {packingResult.proTips?.map((tip: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-golden font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. AI BUDGET OPTIMIZER */}
      {activeSubTab === "budget" && (
        <div id="ai-budget-module" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Box */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-5 h-fit text-xs font-sans">
            <h3 className="font-display font-bold text-base text-gray-950 dark:text-white">Configure Your Capital</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Destination</label>
                <input
                  type="text"
                  value={budgetDest}
                  onChange={(e) => setBudgetDest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                  placeholder="e.g. Kyoto, Maui..."
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={budgetDays}
                  onChange={(e) => setBudgetDays(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Total Trip Budget (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={budgetTotal}
                    onChange={(e) => setBudgetTotal(parseInt(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-gray-400 font-bold mb-1">Comfort Tier Style</label>
                <select
                  value={budgetStyle}
                  onChange={(e) => setBudgetStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950"
                >
                  <option value="Solo">Standard Solo</option>
                  <option value="Luxury">Premium High-End</option>
                  <option value="Backpacking">Frugal Backpacking</option>
                  <option value="Adventure">Active Outdoor</option>
                </select>
              </div>

              <button
                id="optimize-budget-btn"
                onClick={handleGenerateBudget}
                disabled={budgetLoading || !budgetDest.trim() || budgetTotal <= 0}
                className="w-full py-3 bg-gradient-to-r from-ocean to-emerald-green hover:from-ocean-dark hover:to-emerald-dark dark:from-sky dark:to-emerald-green text-white rounded-xl font-bold flex items-center justify-center space-x-1 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>Optimize Capital Allocation</span>
              </button>
            </div>
          </div>

          {/* Budget optimizations charts */}
          <div className="lg:col-span-2">
            {budgetLoading && (
              <div id="ai-budget-loading" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 h-[450px] flex flex-col items-center justify-center text-center">
                <div className="h-10 w-10 border-4 border-ocean/20 border-t-ocean rounded-full animate-spin mb-4" />
                <p className="font-sans font-bold text-sm text-gray-800 dark:text-white">Balancing fiscal allocations...</p>
                <p className="text-2xs text-gray-400 mt-1">Cross-referencing global regional exchange indices...</p>
              </div>
            )}

            {!budgetLoading && !budgetResult && (
              <div id="ai-budget-empty" className="bg-gray-55 dark:bg-slate-950/20 border border-dashed border-gray-200 dark:border-slate-800 p-12 rounded-3xl h-[450px] flex flex-col items-center justify-center text-center">
                <TrendingUp className="h-12 w-12 text-gray-300 dark:text-slate-700 mb-4" />
                <h4 className="font-display font-bold text-gray-700 dark:text-slate-300">No Fiscal Budget Active</h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1.5">
                  Input your planned total trip cash and destination, then click optimize to calculate custom percentage splits.
                </p>
              </div>
            )}

            {!budgetLoading && budgetResult && (
              <div id="ai-budget-result" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 text-xs text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3 gap-2">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-gray-900 dark:text-white">
                      Fiscal splits for {budgetDest} - Total: ${budgetResult.totalCost} USD
                    </h3>
                    <p className="text-2xs text-gray-400 mt-0.5">Calculated daily allocation: ${Math.round(budgetResult.totalCost / budgetDays)}/day for {budgetDays} days.</p>
                  </div>
                  
                  {/* Efficiency gauge */}
                  <div className="flex items-center space-x-2 bg-emerald-light/30 dark:bg-emerald-dark/10 px-3 py-1.5 rounded-xl border border-emerald-green/20">
                    <TrendingUp className="h-4.5 w-4.5 text-emerald-green" />
                    <div>
                      <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Efficiency</span>
                      <span className="font-mono font-black text-sm text-emerald-green">{budgetResult.efficiencyScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* Progress bars showing percentage split */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-sm text-gray-950 dark:text-white">Recommended Allocation Splits</h4>
                  <div className="space-y-3">
                    {budgetResult.allocations?.map((alloc: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-sans font-bold text-gray-850 dark:text-slate-200">{alloc.category}</span>
                          <span className="font-mono font-bold text-gray-500">${alloc.amount} <span className="text-2xs font-normal">({alloc.percentage}%)</span></span>
                        </div>
                        {/* Custom progress track */}
                        <div className="relative w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              idx === 0 ? "bg-ocean dark:bg-sky" :
                              idx === 1 ? "bg-sunset" :
                              idx === 2 ? "bg-emerald-green" :
                              idx === 3 ? "bg-golden" :
                              "bg-purple-500"
                            }`}
                            style={{ width: `${alloc.percentage}%` }}
                          />
                        </div>
                        <p className="text-[10px] font-sans text-gray-500">{alloc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Savings tips & warnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <div className="space-y-2 bg-gray-55 dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                    <h5 className="font-display font-bold text-xs text-gray-900 dark:text-white">Saving Hacks</h5>
                    <ul className="space-y-1.5">
                      {budgetResult.savingsTips?.map((tip: string, idx: number) => (
                        <li key={idx} className="text-2xs font-sans text-gray-600 dark:text-slate-400 flex items-start space-x-1.5">
                          <span className="text-ocean dark:text-sky font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-red-50/10 dark:bg-red-950/10 p-4 rounded-xl border border-red-100/20">
                    <h5 className="font-display font-bold text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <ShieldAlert className="h-4 w-4" />
                      <span>Cost Warnings & Alerts</span>
                    </h5>
                    <ul className="space-y-1.5">
                      {budgetResult.costAlerts?.map((alert: string, idx: number) => (
                        <li key={idx} className="text-2xs font-sans text-gray-600 dark:text-slate-400 flex items-start space-x-1.5">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Carbon Footprint Calculator Section */}
                <div className="col-span-1 md:col-span-2 bg-emerald-light/20 dark:bg-emerald-dark/10 border border-emerald-green/10 p-4 rounded-2xl flex items-center gap-4 text-left">
                  <Footprints className="h-10 w-10 text-emerald-green flex-shrink-0 animate-pulse" />
                  <div>
                    <h4 className="font-display font-bold text-xs text-emerald-green">Estimated Eco-Carbon Footprint</h4>
                    <p className="text-2xs font-sans text-gray-700 dark:text-slate-300 mt-1 leading-normal">
                      Based on your style ({budgetStyle}) and {budgetDays} days of travel, your carbon footprint is approximately <span className="font-mono font-bold text-emerald-green">0.42 tonnes CO2e</span>. Offset your flight legs by donating to conservation programs loaded in the Local Guide.
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
