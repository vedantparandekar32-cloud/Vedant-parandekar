import { Destination } from "../types";

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: "kyoto-japan",
    name: "Kyoto",
    country: "Japan",
    city: "Kyoto",
    category: "Heritage",
    rating: 4.9,
    bestSeason: "October to April (Cherry Blossom or Autumn)",
    averageBudget: 150,
    shortDescription: "The cultural heart of Japan, famous for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    overview: "Kyoto was Japan's capital for over a millennium. It is a stunning city where the ancient world seamlessly blends with the modern, preserving traditional customs, crafts, tea ceremonies, and geisha districts alongside sleek metropolitan structures.",
    history: "Founded in 794 as Heian-kyo, Kyoto served as the seat of Japan's Imperial Court until the capital moved to Tokyo in 1869. Miraculously, it was largely spared from atomic bombs and air raids during WWII, preserving thousands of priceless historic monuments.",
    culture: "Kyoto represents the pinnacle of traditional Japanese culture, celebrated for its Zen gardens, geisha arts in Gion, kaiseki dining, tea ceremonies, and deep Shinto and Buddhist practices.",
    language: "Japanese (English is widely understood in tourist centers)",
    currency: "Japanese Yen (¥, JPY)",
    emergencyNumbers: {
      police: "110",
      medical: "119",
      touristSOS: "03-3501-1122"
    },
    photos: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder but correct embed format
    coordinates: { lat: 35.0116, lng: 135.7681 },
    attractions: [
      {
        name: "Fushimi Inari-taisha",
        description: "The iconic head shrine of the god Inari, famous for its pathway of thousands of vibrant orange torii gates threading up Mount Inari.",
        image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=500&auto=format&fit=crop",
        type: "Cultural"
      },
      {
        name: "Kinkaku-ji (Golden Pavilion)",
        description: "A stunning Zen temple whose top two floors are completely covered in brilliant gold leaf, overlooking a tranquil mirror-like pond.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=500&auto=format&fit=crop",
        type: "History"
      },
      {
        name: "Arashiyama Bamboo Grove",
        description: "A magical pathway winding through towering stalks of green giant bamboo that sway and whisper in the mountain wind.",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      }
    ],
    hotels: [
      {
        id: "kyoto-h1",
        name: "Sowaka Ryokan",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=500&auto=format&fit=crop",
        price: 450,
        rating: 4.9,
        location: "Gion District, Kyoto",
        amenities: ["Traditional Futons", "Onsen-style bath", "Private Zen Garden", "Kaiseki Breakfast", "Free WiFi"],
        availability: true,
        facilities: ["Spa", "Traditional Tea Room", "Gardens", "Restaurant"]
      },
      {
        id: "kyoto-h2",
        name: "The Thousand Kyoto",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
        price: 220,
        rating: 4.7,
        location: "Shimogyo-ku, near Kyoto Station",
        amenities: ["Modern Spa", "Fitness Center", "Vibrant Cafe", "Sleek Minimalist Rooms", "Free WiFi"],
        availability: true,
        facilities: ["Gym", "Meeting Rooms", "Bar", "Restaurant"]
      }
    ],
    restaurants: [
      {
        id: "kyoto-r1",
        name: "Gion Karyo",
        category: "Fine Dining",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Seasonal Kaiseki course", "Handcrafted Sake pairing", "Matcha Tofu specialty"],
        rating: 4.8,
        distance: "0.2 km from Gion",
        openingHours: "11:30 AM - 2:30 PM, 5:30 PM - 10:00 PM",
        googleMapsLink: "https://maps.google.com/?q=Gion+Karyo+Kyoto",
        priceRange: "$$$$"
      },
      {
        id: "kyoto-r2",
        name: "Omen Ginkakuji",
        category: "Local Cuisine",
        image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Thick wheat Udon noodles", "Fresh seasonal vegetable tempura", "Sesame dipping broth"],
        rating: 4.6,
        distance: "1.2 km from Ginkaku-ji",
        openingHours: "11:00 AM - 9:00 PM",
        googleMapsLink: "https://maps.google.com/?q=Omen+Ginkakuji+Kyoto",
        priceRange: "$$"
      }
    ],
    activities: [
      {
        id: "kyoto-a1",
        name: "Traditional Tea Ceremony Experience",
        difficulty: "Easy",
        duration: "1.5 hours",
        cost: 40,
        safetyLevel: "High",
        requiredEquipment: ["Socks (mandatory inside traditional rooms)"],
        description: "Learn the Zen philosophy behind Japanese tea preparation from a certified master, whisking your own high-grade ceremonial matcha.",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "kyoto-a2",
        name: "Gion Night Walking Tour",
        difficulty: "Easy",
        duration: "2 hours",
        cost: 30,
        safetyLevel: "High",
        requiredEquipment: ["Comfortable walking shoes"],
        description: "Stroll along historic streets lit by lanterns while hearing stories of Gion's rich history, and catch a glimpse of real Geikos and Maikos.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500&auto=format&fit=crop"
      }
    ],
    transportation: [
      {
        type: "Metro",
        description: "Extensive and highly punctual subway system connecting central wards.",
        travelTime: "5-15 mins",
        estimatedCost: "$2 - $4 per ride"
      },
      {
        type: "Bus",
        description: "Excellent bus network (Flat Rate $2.20) connecting all major temples.",
        travelTime: "15-30 mins",
        estimatedCost: "$2.20 flat rate"
      },
      {
        type: "Bike Rental",
        description: "Perfect way to explore Kyoto's flat residential streets and riversides.",
        travelTime: "Flexible",
        estimatedCost: "$10 - $15 per day"
      }
    ],
    reviews: [
      { id: "rev-k1", user: "Sophia L.", rating: 5, comment: "Absolutely breathtaking. Walking through the Fushimi Inari gates early in the morning was a spiritual experience I'll never forget.", date: "2026-05-12" },
      { id: "rev-k2", user: "Marco G.", rating: 4.8, comment: "The Sowaka Ryokan was spectacular. Kaiseki dinner was an absolute masterclass of flavors. A must-visit city.", date: "2026-06-01" }
    ],
    localGuide: {
      traditions: ["Remove shoes before entering temples, ryokans, and traditional homes.", "Quiet talking on public transit and inside sacred structures.", "Bowing as a sign of respect and greeting."],
      festivals: ["Gion Matsuri (July) - One of Japan's most famous festivals with giant floats.", "Jidai Matsuri (October) - Spectacular parade of historical epochs."],
      dressCode: "Modest and neat clothing. Ensure socks are clean since you will remove shoes often.",
      etiquette: ["Never stick chopsticks vertically in a bowl of rice.", "Avoid walking while eating or drinking street food.", "Do not photograph geishas without permission."],
      phrases: [
        { phrase: "Konnichiwa", translation: "Hello", pronunciation: "Kon-nee-chee-wah" },
        { phrase: "Arigatou Gozaimasu", translation: "Thank you very much", pronunciation: "Ah-ree-gah-toh Go-zye-mahs" },
        { phrase: "Sumimasen", translation: "Excuse me / Sorry", pronunciation: "Soo-mee-mah-sen" }
      ],
      safetyAdvice: ["Extremely safe city with negligible crime.", "In case of earthquakes, find cover and follow instructions immediately.", "Stay hydrated during hot humid summers."]
    }
  },
  {
    id: "maui-hawaii",
    name: "Maui",
    country: "USA",
    city: "Maui",
    category: "Beach",
    rating: 4.8,
    bestSeason: "April to September (Dry Summer Season)",
    averageBudget: 280,
    shortDescription: "An island paradise in Hawaii known for its world-famous beaches, spectacular volcanic landscapes, sacred Iao Valley, and dramatic humpback whale migrations.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    overview: "Maui, also known as 'The Valley Isle,' is beloved for its diverse geography ranging from pristine turquoise waters to the lunar landscapes of Haleakala Crater, providing the ultimate adventure and beach escape.",
    history: "Formed by two overlapping volcanoes, Maui has a rich Polynesian history. It was later a whaling center and sugar cane hub, with the historic town of Lahaina playing a key role as the kingdom's early capital.",
    culture: "Embraces the 'Aloha spirit'—a lifestyle of warmth, hospitality, respect, and deep harmony with nature, celebrated through traditional Hula dancing, Ukulele music, and Hawaiian chants.",
    language: "English & Hawaiian",
    currency: "US Dollar ($)",
    emergencyNumbers: {
      police: "911",
      medical: "911",
      touristSOS: "808-586-2405"
    },
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 20.7984, lng: -156.3319 },
    attractions: [
      {
        name: "Haleakalā National Park",
        description: "A colossal shield volcano that comprises over 75% of Maui island, offering mesmerizing sunrise views over a sea of clouds.",
        image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      },
      {
        name: "Kaanapali Beach",
        description: "Three miles of flawless white sand and crystal-clear water, featuring the daily cliff diving ceremony off Black Rock.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      },
      {
        name: "Iao Valley State Monument",
        description: "A lush, emerald-mantled valley showcasing the famous 1,200-foot volcanic pinnacle, the Iao Needle.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500&auto=format&fit=crop",
        type: "History"
      }
    ],
    hotels: [
      {
        id: "maui-h1",
        name: "Four Seasons Resort Maui at Wailea",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
        price: 850,
        rating: 4.9,
        location: "Wailea, South Maui",
        amenities: ["Oceanfront Infinity Pools", "World-class Spa", "Private beach cabanas", "Championship Golf", "Free WiFi"],
        availability: true,
        facilities: ["Spa", "Golf Course", "Gym", "3 Restaurants", "Bars"]
      },
      {
        id: "maui-h2",
        name: "Ka'anapali Beach Hotel",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop",
        price: 310,
        rating: 4.6,
        location: "Kaanapali, West Maui",
        amenities: ["Traditional Hawaiian Crafts Workshops", "Ocean View Rooms", "Hula Classes", "Whale watching desks", "Free WiFi"],
        availability: true,
        facilities: ["Outdoor Pool", "Cultural Center", "Beach Bar", "Restaurant"]
      }
    ],
    restaurants: [
      {
        id: "maui-r1",
        name: "Mama's Fish House",
        category: "Fine Dining",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Stuffed Mahi Mahi wrapped in ti leaf", "Freshly caught Onaga snapper", "Coconut-crusted crab cakes"],
        rating: 4.9,
        distance: "0.1 km from Kuau Cove",
        openingHours: "11:00 AM - 9:00 PM (Requires months of booking)",
        googleMapsLink: "https://maps.google.com/?q=Mamas+Fish+House+Maui",
        priceRange: "$$$$"
      },
      {
        id: "maui-r2",
        name: "Star Noodle",
        category: "Local Cuisine",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Garlic Noodles", "Pork Belly Steamed Buns", "Saimin (Hawaiian noodle soup)"],
        rating: 4.5,
        distance: "2.1 km from Lahaina",
        openingHours: "11:30 AM - 8:30 PM",
        googleMapsLink: "https://maps.google.com/?q=Star+Noodle+Maui",
        priceRange: "$$"
      }
    ],
    activities: [
      {
        id: "maui-a1",
        name: "Scuba Diving in Molokini Crater",
        difficulty: "Moderate",
        duration: "5 hours",
        cost: 160,
        safetyLevel: "High (Coast Guard approved)",
        requiredEquipment: ["Wetsuit", "Mask & Fins (Provided by operator)"],
        description: "Dive or snorkel into Molokini, a crescent-shaped volcanic crater boasting crystal waters with 150-foot visibility and 250 species of marine life.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "maui-a2",
        name: "Haleakala Sunrise Adventure",
        difficulty: "Easy",
        duration: "4 hours",
        cost: 85,
        safetyLevel: "Moderate",
        requiredEquipment: ["Heavy warm winter jacket", "Beanies", "Gloves"],
        description: "Witness a spectacular sunrise atop a 10,023-foot volcanic peak, feeling like you are standing on the surface of another planet.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=500&auto=format&fit=crop"
      }
    ],
    transportation: [
      {
        type: "Car Rental",
        description: "Virtually mandatory to fully explore Maui, especially for Haleakala and Road to Hana.",
        travelTime: "Flexible",
        estimatedCost: "$45 - $80 per day"
      },
      {
        type: "Taxi",
        description: "Available but expensive for long-distance island transport.",
        travelTime: "Flexible",
        estimatedCost: "Metended ($3.50 base + $3 per mile)"
      },
      {
        type: "Walking",
        description: "Perfect within resort areas like Kaanapali and Wailea beach paths.",
        travelTime: "N/A",
        estimatedCost: "Free"
      }
    ],
    reviews: [
      { id: "rev-m1", user: "Evelyn T.", rating: 5, comment: "Molokini crater snorkeling was outstanding! I saw two sea turtles and a reef shark. Absolute paradise.", date: "2026-06-20" },
      { id: "rev-m2", user: "Daniel K.", rating: 4.7, comment: "The Haleakala sunrise was incredibly cold but incredibly majestic. Wear layers!", date: "2026-07-02" }
    ],
    localGuide: {
      traditions: ["Malama Aina: Deep respect and duty to care for the land.", "Do not touch green sea turtles or monk seals (strict federal laws protect them).", "Greet locals with warmth and a friendly 'Aloha'."],
      festivals: ["Aloha Festivals (September) - Celebration of Hawaiian culture and music.", "Maui Whale Festival (February) - Celebrating the return of the Humpback Whales."],
      dressCode: "Casual beachwear, sandals (slippers). Rashguards recommended for reef protection.",
      etiquette: ["Never take volcanic stones or black sand home (Pele's Curse).", "Drive slowly and with patience (Hawaiian pace, no honking).", "Remove slippers before entering homes."],
      phrases: [
        { phrase: "Aloha", translation: "Hello / Goodbye / Love", pronunciation: "Ah-loh-hah" },
        { phrase: "Mahalo", translation: "Thank you", pronunciation: "Mah-hah-loh" },
        { phrase: "A hui hou", translation: "Until we meet again", pronunciation: "Ah-hoo-ee-ho-oo" }
      ],
      safetyAdvice: ["Check surf conditions and warnings before entering the ocean.", "Apply reef-safe sunscreen only.", "Never leave valuables in rental cars."]
    }
  },
  {
    id: "banff-canada",
    name: "Banff National Park",
    country: "Canada",
    city: "Banff",
    category: "Mountains",
    rating: 4.9,
    bestSeason: "June to August (Summer Hiking) or December to March (Skiing)",
    averageBudget: 190,
    shortDescription: "Canada's oldest national park, encompassing majestic Rocky Mountain peaks, turquoise glacial lakes, abundant wildlife, and a vibrant resort town.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    overview: "Located in Alberta, Banff National Park is a mountainous paradise spanning 6,641 square kilometers. Its rugged wilderness is famed for Moraine Lake and Lake Louise, two bodies of water whose unreal turquoise colors are legendary.",
    history: "Established in 1885, Banff began as a modest 26-square-kilometer reserve around natural thermal hot springs discovered by railway workers. It expanded into Canada's premiere national park under the guidance of the Canadian Pacific Railway.",
    culture: "Blends mountain ruggedness with high-end resort elegance. Mountain guides, park rangers, and ski culture dictate the lifestyle, prioritizing environmental protection and outdoor exploration.",
    language: "English (French is also official)",
    currency: "Canadian Dollar ($, CAD)",
    emergencyNumbers: {
      police: "911",
      medical: "911",
      touristSOS: "403-762-1200"
    },
    photos: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1433832597026-63a5d10d98ed?q=80&w=600&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 51.1784, lng: -115.5708 },
    attractions: [
      {
        name: "Moraine Lake",
        description: "A glacially-fed lake in the Valley of the Ten Peaks, whose intense blue-green water is surrounded by rugged mountain walls.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      },
      {
        name: "Lake Louise",
        description: "Known for its beautiful turquoise colour and the imposing Victoria Glacier background, with the grand Fairmont Chateau standing on its shore.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      },
      {
        name: "Banff Upper Hot Springs",
        description: "Relaxing, therapeutic thermal pools outdoors offering spectacular panoramic vistas across Mount Rundle.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
        type: "Cultural"
      }
    ],
    hotels: [
      {
        id: "banff-h1",
        name: "Fairmont Banff Springs",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
        price: 580,
        rating: 4.8,
        location: "Spray Avenue, Banff",
        amenities: ["Historic Castle Architecture", "Massive indoor/outdoor heated pools", "Proximity to Bow Falls", "Luxury Spa", "Free WiFi"],
        availability: true,
        facilities: ["Spa", "Golf Course", "Gym", "5 Restaurants", "Bar"]
      },
      {
        id: "banff-h2",
        name: "Moose Hotel & Suites",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop",
        price: 240,
        rating: 4.6,
        location: "Banff Avenue, Central Banff",
        amenities: ["Rooftop hot pools with mountain views", "Stone fireplaces in suites", "Warm cabin aesthetic", "Free transit passes", "Free WiFi"],
        availability: true,
        facilities: ["Pool", "Spa", "Gym", "Italian Restaurant", "Bar"]
      }
    ],
    restaurants: [
      {
        id: "banff-r1",
        name: "The Grizzly House",
        category: "Local Cuisine",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Traditional Swiss cheese fondue", "Exotic meat hot stone grill (buffalo, elk)", "Chocolate fondue dessert"],
        rating: 4.7,
        distance: "0.1 km from Banff Ave",
        openingHours: "11:30 AM - 11:30 PM (Requires reservations)",
        googleMapsLink: "https://maps.google.com/?q=The+Grizzly+House+Banff",
        priceRange: "$$$"
      },
      {
        id: "banff-r2",
        name: "Park Distillery Restaurant & Bar",
        category: "Fine Dining",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["House-distilled glacial gin & vodka", "Campfire rotisserie chicken", "Wood-fired steaks"],
        rating: 4.6,
        distance: "0.2 km from Town Center",
        openingHours: "12:00 PM - 10:00 PM",
        googleMapsLink: "https://maps.google.com/?q=Park+Distillery+Banff",
        priceRange: "$$"
      }
    ],
    activities: [
      {
        id: "banff-a1",
        name: "Mount Norquay Via Ferrata",
        difficulty: "Challenging",
        duration: "4 hours",
        cost: 150,
        safetyLevel: "High (Fully harnessed, professional lead)",
        requiredEquipment: ["Sturdy hiking boots", "Harness & Helmet (Provided)"],
        description: "Climb rock walls, cross suspension bridges, and walk along narrow ledges while secured to steel cables high above the Banff valley.",
        image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "banff-a2",
        name: "Johnston Canyon Icewalk (Winter Only)",
        difficulty: "Moderate",
        duration: "3 hours",
        cost: 65,
        safetyLevel: "High (Park warden approved paths)",
        requiredEquipment: ["Ice cleats (Provided)", "Thick winter gloves", "Thermal wear"],
        description: "Hike along suspended steel catwalks inside a deep limestone gorge, marveling at towering frozen pillars of blue ice and waterfalls.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop"
      }
    ],
    transportation: [
      {
        type: "Bus",
        description: "Roam Transit runs green electric buses across Banff town, Lake Louise, and Minnewanka.",
        travelTime: "10-45 mins",
        estimatedCost: "$2 - $5 per ride"
      },
      {
        type: "Car Rental",
        description: "Highly recommended if exploring the spectacular Icefields Parkway up to Jasper.",
        travelTime: "Flexible",
        estimatedCost: "$50 - $90 per day"
      },
      {
        type: "Bike Rental",
        description: "Excellent paved mountain trails, like the Legacy Trail connecting Banff to Canmore.",
        travelTime: "Flexible",
        estimatedCost: "$25 - $40 per day"
      }
    ],
    reviews: [
      { id: "rev-b1", user: "Julian R.", rating: 5, comment: "I stood in awe of Moraine Lake. The color of the water is absolutely real—no filters needed. Grizzly House dinner was also phenomenal.", date: "2026-06-18" },
      { id: "rev-b2", user: "Clara S.", rating: 4.9, comment: "Did the Norquay Via Ferrata. It was scary but totally thrilling! Guides are incredibly professional. A top recommendation.", date: "2026-07-04" }
    ],
    localGuide: {
      traditions: ["Deep conservation culture: Leave No Trace principles strictly enforced.", "Always yield to wildlife (Bears, Elk, Mountain Sheep).", "Warm, hearty mountain greetings."],
      festivals: ["Banff Mountain Film Festival (November) - World's leading adventure cinema event.", "Banff SnowDays (January) - Intricate giant snow sculptures in town."],
      dressCode: "Layers are absolutely vital. Weather can drop 20 degrees suddenly or rain in the afternoon.",
      etiquette: ["Never feed any wildlife. Fines are up to $25,000.", "Always pack out your trash. Use bear-proof garbage cans.", "Keep your dog on a leash at all times."],
      phrases: [
        { phrase: "Park Pass", translation: "National Park Entry Permit", pronunciation: "Park Pass" },
        { phrase: "The Pass", translation: "Mountain pass or gap", pronunciation: "The Pass" },
        { phrase: "Eh", translation: "Right? / Don't you think?", pronunciation: "Ay" }
      ],
      safetyAdvice: ["Carry bear spray and know how to use it when hiking.", "Do not approach elk, particularly during the autumn rutting season.", "Stay on marked trails; mountain terrain is unstable."]
    }
  },
  {
    id: "serengeti-tanzania",
    name: "Serengeti National Park",
    country: "Tanzania",
    city: "Serengeti",
    category: "Wildlife",
    rating: 4.9,
    bestSeason: "January to March (Calving) or June to October (Great Migration Crossings)",
    averageBudget: 350,
    shortDescription: "A massive protected savanna hosting the Great Migration—the massive movement of over 1.5 million wildebeest and zebras—and the highest concentration of lions on Earth.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop",
    overview: "The Serengeti, whose name derives from the Maasai phrase 'Siringet' (endless plains), is a UNESCO World Heritage site and the crown jewel of African safaris, offering an unparalleled window into raw nature.",
    history: "Inhabited by Maasai pastoralists for thousands of years before the arrival of Europeans. It was designated a game reserve in 1921 and converted into Tanzania's first national park in 1951 to save wildlife from overhunting.",
    culture: "Deeply enriched by Maasai tribal culture. Local conservation practices represent a balance between nomadic pastoralist heritage and strict state wilderness protection.",
    language: "Swahili & English",
    currency: "Tanzanian Shilling (TZS) / US Dollars widely accepted",
    emergencyNumbers: {
      police: "112",
      medical: "112",
      touristSOS: "+255-27-250-3471"
    },
    photos: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=600&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: -2.1540, lng: 34.6857 },
    attractions: [
      {
        name: "Seronera Valley",
        description: "The heart of the Serengeti, famed for its lush river paths which harbor a very high density of elusive leopards and prides of lions.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      },
      {
        name: "Mara River Crossing",
        description: "The dramatic, high-adrenaline northern river where millions of migrating wildebeests face off with massive Nile crocodiles.",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=500&auto=format&fit=crop",
        type: "Nature"
      },
      {
        name: "Maasai Cultural Village boma",
        description: "An authentic interactive settlement where travelers can learn about Maasai traditions, livestock, and jumping dances.",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=500&auto=format&fit=crop",
        type: "Cultural"
      }
    ],
    hotels: [
      {
        id: "ser-h1",
        name: "Four Seasons Safari Lodge Serengeti",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
        price: 1100,
        rating: 4.9,
        location: "Central Serengeti Plains",
        amenities: ["Infinity Pool overlooking active watering hole", "Sleek elevated timber walkways", "24/7 armed lodge escorts", "Spa & Gym", "Free WiFi"],
        availability: true,
        facilities: ["Spa", "Gym", "Lounge", "Bar", "African Restaurant"]
      },
      {
        id: "ser-h2",
        name: "Kati Kati Tented Camp",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop",
        price: 290,
        rating: 4.7,
        location: "Central Serengeti, near Seronera",
        amenities: ["Authentic mobile safari tents", "Solar power lighting", "Cozy campfire (Bush TV)", "Chef-prepared local dinners", "Satellite internet"],
        availability: true,
        facilities: ["Mess Tent", "Campfire Circle", "Escorted Walks"]
      }
    ],
    restaurants: [
      {
        id: "ser-r1",
        name: "The Boma at Four Seasons",
        category: "Fine Dining",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Grilled impala or ostrich loin", "Spiced Swahili curries", "Local cassava and ugali pairing"],
        rating: 4.8,
        distance: "Central Lodge",
        openingHours: "6:30 PM - 10:00 PM (Lodge residents & booking)",
        googleMapsLink: "https://maps.google.com/?q=Four+Seasons+Serengeti",
        priceRange: "$$$$"
      },
      {
        id: "ser-r2",
        name: "Seronera Visitor Centre Cafe",
        category: "Local Cuisine",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Samosas and spice tea", "Swahili style pilau rice", "Fresh roasted coffee"],
        rating: 4.2,
        distance: "Seronera Center",
        openingHours: "8:00 AM - 5:00 PM",
        googleMapsLink: "https://maps.google.com/?q=Seronera+Visitor+Centre",
        priceRange: "$"
      }
    ],
    activities: [
      {
        id: "ser-a1",
        name: "Hot Air Balloon Safari",
        difficulty: "Easy",
        duration: "3.5 hours",
        cost: 490,
        safetyLevel: "High (Civil Aviation Authority licensed)",
        requiredEquipment: ["Windbreaker jacket", "Zoom camera lenses"],
        description: "Float silently above the sweeping grasslands at dawn, spotting herds of elephants, running giraffes, and hunting lions from the sky.",
        image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "ser-a2",
        name: "Guided Walking Safari",
        difficulty: "Moderate",
        duration: "4 hours",
        cost: 110,
        safetyLevel: "High (Armed Ranger escorted)",
        requiredEquipment: ["Ankle-high hiking boots", "Safari neutral khaki clothing"],
        description: "Step onto the savannah on foot, learning animal tracking, indigenous plant medicine, and the micro-ecosystems of the bush.",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=500&auto=format&fit=crop"
      }
    ],
    transportation: [
      {
        type: "Car Rental",
        description: "4x4 Land Cruiser with a pop-up roof (must be booked with an experienced driver/guide).",
        travelTime: "Flexible",
        estimatedCost: "$150 - $250 per day"
      },
      {
        type: "Flights",
        description: "Coastal Aviation runs small propeller planes from Arusha directly into Seronera Airstrip.",
        travelTime: "1 hour",
        estimatedCost: "$180 - $250 one way"
      }
    ],
    reviews: [
      { id: "rev-s1", user: "Gavin P.", rating: 5, comment: "Unbelievable. We saw a leopard sitting in an acacia tree with a fresh kill. The Great Migration crossing is pure heart-stopping drama.", date: "2026-06-25" },
      { id: "rev-s2", user: "Maria H.", rating: 5, comment: "The balloon safari is expensive but fully worth every single dollar. Watching a pride of lions stalking zebra from above is magical.", date: "2026-07-05" }
    ],
    localGuide: {
      traditions: ["Deep reverence for Maasai land and ancestral agreements.", "Strict respect for park boundaries and ecosystem balance."],
      festivals: ["Maasai Festival - Intermittent tribal gathering with jumping contests."],
      dressCode: "Durable khaki, beige, or olive green clothing. Avoid bright blue and black (they attract annoying tsetse flies).",
      etiquette: ["Never stand up in the safari vehicle or scream near animals.", "Do not throw trash of any kind.", "Always ask Maasai people before taking their photo."],
      phrases: [
        { phrase: "Jambo", translation: "Hello", pronunciation: "Jahm-boh" },
        { phrase: "Asante Sana", translation: "Thank you very much", pronunciation: "Ah-sahn-tay Sah-nah" },
        { phrase: "Hakuna Matata", translation: "No worries / No problem", pronunciation: "Hah-koo-nah Mah-tah-tah" }
      ],
      safetyAdvice: ["Malaria medication is strongly advised before and during your stay.", "Never exit your vehicle unless explicitly instructed by your armed guide.", "Keep tents zipped at night to keep bugs and small animals out."]
    }
  },
  {
    id: "varanasi-india",
    name: "Varanasi",
    country: "India",
    city: "Varanasi",
    category: "Spiritual",
    rating: 4.8,
    bestSeason: "October to March (Cooler Winter months)",
    averageBudget: 70,
    shortDescription: "One of the oldest continuously inhabited cities in the world, Varanasi is the spiritual capital of India, rising along the sacred banks of the Ganges River.",
    image: "https://images.unsplash.com/photo-1561361062-11852dae193e?q=80&w=1200&auto=format&fit=crop",
    overview: "Varanasi, also called Benares or Kashi, is a sensory-rich spiritual hub in Uttar Pradesh. To Hindus, dying here brings Moksha (liberation from the cycle of rebirth). The city is famed for its monumental riverfront stone ghats.",
    history: "Dating back to the 11th century BCE, legend says Varanasi was founded by Lord Shiva. For millennia, it has been a world center for philosophy, art, classical music, and spirituality, visited by figures like Buddha.",
    culture: "Intensely vibrant spiritual culture centered around ghat rituals, devotional music, silk weaving (Banarasi sarees), classical literature, and ancient Ayurvedic medicine.",
    language: "Hindi & English",
    currency: "Indian Rupee (₹, INR)",
    emergencyNumbers: {
      police: "112",
      medical: "102",
      touristSOS: "+91-542-250-2234"
    },
    photos: [
      "https://images.unsplash.com/photo-1561361062-11852dae193e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598977123418-45f04b01fe14?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?q=80&w=600&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 25.3176, lng: 82.9739 },
    attractions: [
      {
        name: "Dashashwamedh Ghat",
        description: "The primary and most spectacular ghat, where high-priests conduct the majestic, fire-lit Ganga Aarti ritual every single evening.",
        image: "https://images.unsplash.com/photo-1598977123418-45f04b01fe14?q=80&w=500&auto=format&fit=crop",
        type: "Spiritual"
      },
      {
        name: "Kashi Vishwanath Temple",
        description: "The glorious Golden Temple dedicated to Lord Shiva, featuring 800 kilograms of pure gold leaf covering its monumental spires.",
        image: "https://images.unsplash.com/photo-1561361062-11852dae193e?q=80&w=500&auto=format&fit=crop",
        type: "Spiritual"
      },
      {
        name: "Sarnath",
        description: "Located just 10 km away, Sarnath is where Gautama Buddha preached his very first sermon after attaining full enlightenment.",
        image: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?q=80&w=500&auto=format&fit=crop",
        type: "History"
      }
    ],
    hotels: [
      {
        id: "var-h1",
        name: "BrijRama Palace",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
        price: 260,
        rating: 4.8,
        location: "Darbhanga Ghat, Varanasi",
        amenities: ["18th-Century Heritage Fort Residence", "Direct river boat arrival access", "Daily Indian classical live music", "Ayurvedic wellness spa", "Free WiFi"],
        availability: true,
        facilities: ["Spa", "Elevator", "Library", "Vegetarian Fine-Dining Restaurant"]
      },
      {
        id: "var-h2",
        name: "Alka Hotel",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop",
        price: 45,
        rating: 4.4,
        location: "Dashashwamedh Ghat, Varanasi",
        amenities: ["Stunning river-facing rooftop patio", "Clean vegetarian kitchen", "Ghat access stairs", "Free high-speed WiFi"],
        availability: true,
        facilities: ["Rooftop Cafe", "Yoga Shala", "Travel Desk"]
      }
    ],
    restaurants: [
      {
        id: "var-r1",
        name: "Keshari Restaurant",
        category: "Vegetarian",
        image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Banarasi Thali (Royal Assortment)", "Paneer Butter Masala", "Dal Makhani with Butter Naan"],
        rating: 4.5,
        distance: "0.1 km from Dashashwamedh",
        openingHours: "11:00 AM - 10:30 PM",
        googleMapsLink: "https://maps.google.com/?q=Keshari+Restaurant+Varanasi",
        priceRange: "$$"
      },
      {
        id: "var-r2",
        name: "Blue Lassi Shop",
        category: "Street Food",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Pomegranate & chocolate clay-pot lassi", "Saffron almond lassi", "Mango lassi"],
        rating: 4.7,
        distance: "0.4 km from Manikarnika Ghat",
        openingHours: "9:00 AM - 10:00 PM",
        googleMapsLink: "https://maps.google.com/?q=Blue+Lassi+Shop+Varanasi",
        priceRange: "$"
      }
    ],
    activities: [
      {
        id: "var-a1",
        name: "Sunrise Boat Ride on the Ganges",
        difficulty: "Easy",
        duration: "2 hours",
        cost: 15,
        safetyLevel: "Moderate",
        requiredEquipment: ["Life vest (provided on request)"],
        description: "Glide silently in a rowboat at dawn, witnessing thousands of pilgrims bathing and offering prayers against the backdrop of orange skies.",
        image: "https://images.unsplash.com/photo-1598977123418-45f04b01fe14?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "var-a2",
        name: "Heritage Heritage Walk of Old City alleys",
        difficulty: "Moderate",
        duration: "3 hours",
        cost: 20,
        safetyLevel: "High",
        requiredEquipment: ["Comfortable walking shoes", "Shoulder covering shawl"],
        description: "Wind through a maze of incredibly narrow historic alleys packed with shrines, flower sellers, cows, and classical houses.",
        image: "https://images.unsplash.com/photo-1561361062-11852dae193e?q=80&w=500&auto=format&fit=crop"
      }
    ],
    transportation: [
      {
        type: "Taxi",
        description: "Auto-rickshaws (Tuk-Tuks) are the fastest way to get near the pedestrian-only ghats.",
        travelTime: "10-25 mins",
        estimatedCost: "$1.50 - $3 per ride"
      },
      {
        type: "Bike Rental",
        description: "Available but chaotic; not recommended for beginners due to extremely busy traffic.",
        travelTime: "Flexible",
        estimatedCost: "$5 - $8 per day"
      },
      {
        type: "Walking",
        description: "The absolute best and only way to navigate the ancient riverside ghats and Old City lanes.",
        travelTime: "N/A",
        estimatedCost: "Free"
      }
    ],
    reviews: [
      { id: "rev-v1", user: "Nirav S.", rating: 5, comment: "An intense, beautiful, sensory explosion. The evening Ganga Aarti fire ritual is magnetic. Varanasi has an energy unlike anywhere else.", date: "2026-05-18" },
      { id: "rev-v2", user: "Emma W.", rating: 4.6, comment: "Sunrise boat ride was incredibly peaceful. It contrasts heavily with the chaos of the city streets. An absolute must-do.", date: "2026-06-22" }
    ],
    localGuide: {
      traditions: ["Touch the holy Ganges water or light a floating oil lamp (diya).", "Greet people with 'Namaste' and hands joined together.", "Remove footwear before entering any temple or home."],
      festivals: ["Dev Deepawali (November) - Millions of clay lamps light up all 84 ghats.", "Maha Shivratri (February) - Deep devotion and grand processions for Lord Shiva."],
      dressCode: "Highly conservative. Cover shoulders, chest, and knees. Shawls are highly recommended.",
      etiquette: ["Never take photos of funerals or cremation ceremonies (Manikarnika Ghat is strictly no-photography).", "Always walk clockwise around temples.", "Politely ignore aggressive street sellers or priests asking for large ritual fees."],
      phrases: [
        { phrase: "Namaste", translation: "Hello / I bow to you", pronunciation: "Nah-mah-stay" },
        { phrase: "Dhanyawaad", translation: "Thank you", pronunciation: "Dhahn-yah-wahd" },
        { phrase: "Kripya", translation: "Please", pronunciation: "Krip-yah" }
      ],
      safetyAdvice: ["Drink bottled water only; avoid ice or raw vegetables from street stalls.", "Beware of pickpockets in dense crowds around major ghats.", "Negotiate rickshaw or boat prices firmly before boarding."]
    }
  },
  {
    id: "rome-italy",
    name: "Rome",
    country: "Italy",
    city: "Rome",
    category: "Heritage",
    rating: 4.8,
    bestSeason: "September to November or April to June (Mild and pleasant)",
    averageBudget: 170,
    shortDescription: "A glorious open-air museum where nearly 3,000 years of globally influential art, architecture, and culture are permanently on display.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
    overview: "Rome, the Eternal City, is the capital of Italy. It houses ruins like the Forum and Colosseum, which recall the golden era of the Roman Empire, while Vatican City showcases St. Peter's Basilica and Renaissance masterpieces.",
    history: "Legend says Rome was founded by twin brothers Romulus and Remus in 753 BCE. It grew into the center of the Roman Empire, then the global core of Roman Catholicism, and later the capital of unified Italy in 1871.",
    culture: "Brimming with Roman lifestyle—lively outdoor squares (piazze), world-class pasta, espresso culture, fine fashion, Vespa rides, and a leisurely approach to work and dining (Dolce Vita).",
    language: "Italian (English is widely spoken)",
    currency: "Euro (€, EUR)",
    emergencyNumbers: {
      police: "112",
      medical: "118",
      touristSOS: "06-0608"
    },
    photos: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529260830199-44552e02213a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 41.9028, lng: 12.4964 },
    attractions: [
      {
        name: "The Colosseum",
        description: "The largest ancient amphitheater ever built, completed in 80 AD, hosting gladiator fights and public spectacles.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=500&auto=format&fit=crop",
        type: "History"
      },
      {
        name: "Trevi Fountain",
        description: "The grand Baroque masterpiece designed by Nicola Salvi, where throwing a coin ensures your eventual return to Rome.",
        image: "https://images.unsplash.com/photo-1529260830199-44552e02213a?q=80&w=500&auto=format&fit=crop",
        type: "Cultural"
      },
      {
        name: "St. Peter's Basilica",
        description: "A monumental Renaissance-style church in Vatican City, housing Michelanglo's Pieta and Bernini's bronze baldachin.",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop",
        type: "Spiritual"
      }
    ],
    hotels: [
      {
        id: "rome-h1",
        name: "Hotel de Russie",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
        price: 650,
        rating: 4.9,
        location: "Via del Babuino, near Piazza del Popolo",
        amenities: ["Stunning Secret Terraced Garden", "Luxury wellness spa", "Acqua di Parma toiletries", "Stylish modern Italian decor", "Free WiFi"],
        availability: true,
        facilities: ["Spa", "Gym", "Garden Lounge", "Michelin-recommended Restaurant"]
      },
      {
        id: "rome-h2",
        name: "Hotel Artemide",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop",
        price: 180,
        rating: 4.8,
        location: "Via Nazionale, Rome",
        amenities: ["Complimentary minibar daily", "Panoramic rooftop bar", "Excellent spa center", "Pillow menu options", "Free WiFi"],
        availability: true,
        facilities: ["Rooftop Bar", "Spa", "Gym", "Restaurant"]
      }
    ],
    restaurants: [
      {
        id: "rome-r1",
        name: "La Pergola",
        category: "Fine Dining",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Fagottelli La Pergola (carbonara parcels)", "Seared sea bass with white truffle", "29-water pairing menu"],
        rating: 4.9,
        distance: "Monte Mario (3 Michelin Stars)",
        openingHours: "7:30 PM - 11:30 PM (Book months ahead)",
        googleMapsLink: "https://maps.google.com/?q=La+Pergola+Rome",
        priceRange: "$$$$"
      },
      {
        id: "rome-r2",
        name: "Cantina e Cucina",
        category: "Local Cuisine",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop",
        menuHighlights: ["Cacio e Pepe", "Classic Carbonara", "Crispy Roman style artichokes"],
        rating: 4.7,
        distance: "0.2 km from Piazza Navona",
        openingHours: "11:00 AM - 1:00 AM",
        googleMapsLink: "https://maps.google.com/?q=Cantina+e+Cucina+Rome",
        priceRange: "$$"
      }
    ],
    activities: [
      {
        id: "rome-a1",
        name: "Colosseum Underground Tour",
        difficulty: "Easy",
        duration: "3 hours",
        cost: 65,
        safetyLevel: "High",
        requiredEquipment: ["IDs matching booking tickets"],
        description: "Descend into the dark chambers beneath the Colosseum floor, seeing where gladiators and wild animals were kept in cages.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=500&auto=format&fit=crop"
      },
      {
        id: "rome-a2",
        name: "Roman Pasta Making Masterclass",
        difficulty: "Easy",
        duration: "3 hours",
        cost: 45,
        safetyLevel: "High",
        requiredEquipment: ["An appetite!"],
        description: "Roll and cut fresh egg pasta alongside a local chef in a cozy kitchen, learning secrets to sauces like Carbonara and Amatriciana.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500&auto=format&fit=crop"
      }
    ],
    transportation: [
      {
        type: "Metro",
        description: "Line A and B cross at Termini Station, very fast for core imperial sites.",
        travelTime: "5-15 mins",
        estimatedCost: "$1.60 per ride"
      },
      {
        type: "Taxi",
        description: "Licensed white taxis are available but require hailing at designated stands.",
        travelTime: "Flexible",
        estimatedCost: "$10 - $20 average"
      },
      {
        type: "Walking",
        description: "Perfect for central historic spots like Pantheon, Trevi, Navona which are pedestrianized.",
        travelTime: "N/A",
        estimatedCost: "Free"
      }
    ],
    reviews: [
      { id: "rev-r1", user: "Gabriel V.", rating: 5, comment: "Pasta making class was the highlight of our trip! Cantina e Cucina's Cacio e Pepe is out of this world.", date: "2026-06-15" },
      { id: "rev-r2", user: "Lucas M.", rating: 4.8, comment: "The Colosseum underground felt incredibly historic. It really brings the gladiator era to life. Rome is unmatched.", date: "2026-07-01" }
    ],
    localGuide: {
      traditions: ["Italian coffee ritual: Espresso is taken standing up at the bar.", "No milk coffees (like Cappuccino) after 11:00 AM.", "Aperitivo: Pre-dinner drinks with light complimentary snacks."],
      festivals: ["Natale di Roma (April 21) - Parades and fights celebrating Rome's birthday.", "Festa de Noantri (July) - Vibrant religious floats in Trastevere."],
      dressCode: "Shoulders and knees must be fully covered to enter St. Peter's Basilica or any church.",
      etiquette: ["Never ask for ketchup on pasta or cheese on seafood dishes.", "Do not swim or dip feet in any historic fountain.", "Tips are appreciated but not strictly required (Coperto or service charge is often included)."],
      phrases: [
        { phrase: "Ciao", translation: "Hello / Goodbye", pronunciation: "Chow" },
        { phrase: "Grazie mille", translation: "Thank you very much", pronunciation: "Graht-zee-eh meel-leh" },
        { phrase: "Il conto, per favore", translation: "The bill, please", pronunciation: "Eel kon-toh, pair fah-voh-reh" }
      ],
      safetyAdvice: ["Watch your pockets and bags closely on crowded Metro lines and at Termini station.", "Avoid illegal street taxis; use official white taxis with meters.", "Stay hydrated by drinking from free public drinking fountains (Nasoni)."]
    }
  }
];

export const SAMPLE_BLOGS = [
  {
    id: "blog-1",
    title: "10 Travel Hacks for Backpacking Across Europe on a Budget",
    author: "Elena Petrova",
    date: "June 24, 2026",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500&auto=format&fit=crop",
    category: "Budget Travel",
    content: "Traveling through Europe doesn't have to cost a fortune. By choosing overnight trains, staying in social hostels with kitchens, purchasing local transit passes, and eating regional street foods, you can explore historic squares and museums for less than $50 a day. Always carry a reusable water bottle and explore city walking tours which are entirely tips-based.",
    readTime: "5 min read",
    likes: 128
  },
  {
    id: "blog-2",
    title: "How to Responsibly Photograph Local Wildlife: A Professional Guide",
    author: "Marcus Vance",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=500&auto=format&fit=crop",
    category: "Photography Tips",
    content: "Wildlife photography is a privilege that comes with deep ethical duties. Always prioritize the animal's comfort over your shot. Keep a safe distance of at least 30 yards (100 yards for predators like bears or lions) by using high-telephoto zoom lenses. Never feed animals or use flash which can cause extreme distress or provoke attacks. Move slowly and silently, wearing natural tones.",
    readTime: "8 min read",
    likes: 94
  },
  {
    id: "blog-3",
    title: "Mastering Kyoto's Complex Temple Etiquette",
    author: "Yuki Tanaka",
    date: "April 02, 2026",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=500&auto=format&fit=crop",
    category: "Culture",
    content: "When stepping into Kyoto's sacred Buddhist and Shinto shrines, keeping respect is crucial. Always remove your shoes at the entrance if slippers are provided. Bow slightly before entering torii gates. Keep your voice at a low whisper, and never take photographs inside the main hall where active prayers are offered. Remember, these are living spiritual sanctuaries, not tourist playgrounds.",
    readTime: "4 min read",
    likes: 156
  }
];
