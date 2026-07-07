import { useState } from "react";
import { Compass, Moon, Sun, Search, User, Globe, Menu, X } from "lucide-react";
import { UserProfile } from "../types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  user: UserProfile;
  onOpenAuth: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  user,
  onOpenAuth,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = [
    { code: "en", name: "English (US)" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "ja", name: "日本語" },
    { code: "hi", name: "हिन्दी" },
  ];

  const navItems = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations" },
    { id: "ai-tools", label: "AI Planner" },
    { id: "blogs", label: "Blog" },
    { id: "user-dashboard", label: "Journal" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            id="brand-logo"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
          >
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Travel<span className="text-sky-600 dark:text-sky font-medium">Explorer</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav" className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-lg font-sans font-medium text-xs transition-all duration-200 ${
                  activeTab === item.id || (item.id === "destinations" && activeTab.startsWith("dest-"))
                    ? "bg-slate-50 dark:bg-slate-900 text-sky-600 dark:text-sky font-semibold"
                    : "text-slate-500 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-900/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search, Theme, Language, Profile Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Box */}
            <div id="header-search-container" className="relative">
              <input
                id="header-search-input"
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 xl:w-52 px-3 py-1.5 pl-9 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-sans focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:focus:ring-sky/30"
              />
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-400" />
            </div>

            {/* Language Selector */}
            <div id="language-selector-container" className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="p-2 text-gray-500 hover:text-ocean dark:text-slate-300 dark:hover:text-sky hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Select Language"
              >
                <Globe className="h-5 w-5" />
              </button>
              {showLangDropdown && (
                <div id="language-dropdown" className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      id={`lang-opt-${lang.code}`}
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-sans hover:bg-gray-50 dark:hover:bg-slate-800 ${
                        language === lang.code ? "text-ocean font-semibold dark:text-sky" : "text-gray-700 dark:text-slate-300"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 hover:text-ocean dark:text-slate-300 dark:hover:text-sky hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-5 w-5 text-golden" /> : <Moon className="h-5 w-5 text-slate-600" />}
            </button>

            {/* Profile Button */}
            <button
              id="profile-access-btn"
              onClick={onOpenAuth}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="h-4 w-4 text-gray-500 dark:text-slate-300" />
              )}
              <span className="text-xs font-sans font-medium text-gray-700 dark:text-slate-300 max-w-[80px] truncate">
                {user.name.split(" ")[0]}
              </span>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              id="mobile-theme-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 dark:text-slate-300 rounded-lg"
            >
              {darkMode ? <Sun className="h-5 w-5 text-golden" /> : <Moon className="h-5 w-5 text-slate-600" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden glass-panel border-t border-gray-100 dark:border-slate-800 py-3 px-4 space-y-2 max-h-screen overflow-y-auto">
          {/* Mobile search */}
          <div id="mobile-search-container" className="relative pb-2">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search guide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-9 rounded-lg text-xs font-sans border border-gray-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
          </div>

          {/* Mobile Nav Links */}
          <div id="mobile-nav-links" className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                id={`mobile-nav-item-${item.id}`}
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-sans font-medium text-sm transition-all ${
                  activeTab === item.id
                    ? "bg-ocean/10 text-ocean dark:bg-sky/10 dark:text-sky font-semibold"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Language & Account */}
          <div id="mobile-footer-controls" className="pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-col space-y-3">
            <button
              id="mobile-auth-btn"
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="h-4 w-4 text-gray-500" />
              )}
              <span className="text-sm font-sans font-medium text-gray-800 dark:text-slate-200">
                {user.name} (My Profile)
              </span>
            </button>
            <div id="mobile-lang-list" className="flex flex-wrap gap-1.5 px-3">
              <span className="text-xs text-gray-400 dark:text-slate-500 w-full mb-1">Select Language:</span>
              {languages.map((lang) => (
                <button
                  id={`mobile-lang-opt-${lang.code}`}
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 rounded text-2xs font-sans border ${
                    language === lang.code
                      ? "bg-ocean text-white border-ocean"
                      : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
