export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Attraction {
  name: string;
  description: string;
  image: string;
  type: string; // "History" | "Nature" | "Adventure" | "Cultural"
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  price: number; // Price per night in USD
  rating: number;
  location: string;
  amenities: string[];
  availability: boolean;
  facilities: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  category: "Vegetarian" | "Non-Vegetarian" | "Local Cuisine" | "Fine Dining" | "Cafe" | "Street Food";
  image: string;
  menuHighlights: string[];
  rating: number;
  distance: string; // e.g. "0.5 km"
  openingHours: string;
  googleMapsLink: string;
  priceRange: string; // "$", "$$", "$$$"
}

export interface AdventureActivity {
  id: string;
  name: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Expert";
  duration: string; // e.g., "3 hours"
  cost: number;
  safetyLevel: string; // e.g., "High (Certified Guides)"
  requiredEquipment: string[];
  description: string;
  image: string;
}

export interface WeatherDay {
  day: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  rainProb: number;
}

export interface WeatherInfo {
  currentTemp: number;
  humidity: number;
  rainProbability: number;
  sunrise: string;
  sunset: string;
  windSpeed: number;
  aqi: number; // Air Quality Index (1-5 or index number)
  forecast: WeatherDay[];
}

export interface TransportOption {
  type: "Flights" | "Trains" | "Metro" | "Bus" | "Taxi" | "Car Rental" | "Bike Rental" | "Walking";
  description: string;
  travelTime: string;
  estimatedCost: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  state?: string;
  city: string;
  category: "Beach" | "Mountains" | "Heritage" | "Wildlife" | "Spiritual";
  rating: number;
  bestSeason: string;
  averageBudget: number; // Budget tier in USD per day
  shortDescription: string;
  image: string;
  overview: string;
  history: string;
  culture: string;
  language: string;
  currency: string;
  emergencyNumbers: {
    police: string;
    medical: string;
    touristSOS: string;
  };
  photos: string[];
  videoUrl?: string;
  coordinates: Coordinates;
  attractions: Attraction[];
  restaurants: Restaurant[];
  hotels: Hotel[];
  activities: AdventureActivity[];
  transportation: TransportOption[];
  reviews: Review[];
  localGuide: {
    traditions: string[];
    festivals: string[];
    dressCode: string;
    etiquette: string[];
    phrases: { phrase: string; translation: string; pronunciation: string }[];
    safetyAdvice: string[];
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
    cost: number;
    type: "sightseeing" | "dining" | "adventure" | "leisure";
  }[];
}

export interface SavedItinerary {
  id: string;
  destinationName: string;
  days: number;
  budget: number;
  style: string;
  daysData: ItineraryDay[];
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  content: string;
  readTime: string;
  likes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[]; // destination IDs
  wishlist: string[]; // destination IDs
  tripHistory: {
    destinationId: string;
    destinationName: string;
    date: string;
    days: number;
  }[];
  journalEntries: {
    id: string;
    destinationId: string;
    destinationName: string;
    title: string;
    date: string;
    content: string;
    images: string[];
  }[];
}
