import React from "react";
import { Star, Calendar, DollarSign, ArrowRight, Heart } from "lucide-react";
import { Destination } from "../types";

interface DestinationCardProps {
  key?: string;
  destination: Destination;
  onExplore: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function DestinationCard({
  destination,
  onExplore,
  isFavorite,
  onToggleFavorite,
}: DestinationCardProps) {
  return (
    <div
      id={`dest-card-${destination.id}`}
      className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800/80 flex flex-col h-full transform hover:-translate-y-1.5"
    >
      {/* Thumbnail Area with hover zoom */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

        {/* Category Badge */}
        <div
          id={`dest-badge-${destination.id}`}
          className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-2xs font-sans font-bold uppercase tracking-wider text-sky-600 dark:text-sky shadow-sm border border-slate-100 dark:border-slate-800"
        >
          {destination.category}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          id={`fav-btn-${destination.id}`}
          onClick={(e) => onToggleFavorite(destination.id, e)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isFavorite
              ? "bg-red-500/20 border-red-500 text-red-500 scale-110"
              : "bg-black/20 border-white/10 text-white hover:bg-white/20"
          }`}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className="h-4.5 w-4.5 fill-current" />
        </button>

        {/* Spot Rating */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-white">
          <Star className="h-3.5 w-3.5 text-golden fill-current" />
          <span className="font-sans font-bold text-shadow">{destination.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-tight group-hover:text-sky-600 dark:group-hover:text-sky transition-colors">
              {destination.name}
            </h3>
            <span className="text-xs font-sans text-slate-400 dark:text-slate-400 font-medium">
              {destination.country}
            </span>
          </div>

          <p className="text-xs font-sans text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {destination.shortDescription}
          </p>
        </div>

        {/* Stats and Action Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5">
          <div className="grid grid-cols-2 gap-2 text-3xs font-mono text-slate-500 dark:text-slate-450">
            {/* Season */}
            <div className="flex items-center space-x-1.5 min-w-0">
              <Calendar className="h-3.5 w-3.5 text-emerald-green flex-shrink-0" />
              <span className="truncate" title={destination.bestSeason}>{destination.bestSeason.split("(")[0]}</span>
            </div>
            {/* Budget */}
            <div className="flex items-center space-x-1.5 justify-end">
              <DollarSign className="h-3.5 w-3.5 text-sunset flex-shrink-0" />
              <span className="font-sans font-bold text-slate-700 dark:text-slate-300">
                ${destination.averageBudget}/day
              </span>
            </div>
          </div>

          <button
            id={`explore-btn-${destination.id}`}
            onClick={() => onExplore(destination.id)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-600 hover:text-white dark:hover:bg-sky dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-sans font-bold transition-all duration-300 border border-slate-100 dark:border-slate-800/40"
          >
            <span>Explore Guide</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
