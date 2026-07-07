import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { FEATURED_DESTINATIONS, SAMPLE_BLOGS } from "./src/data/destinations.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. Get Destinations list
app.get("/api/destinations", (req: Request, res: Response) => {
  res.json(FEATURED_DESTINATIONS);
});

// 2. Get Blogs
app.get("/api/blogs", (req: Request, res: Response) => {
  res.json(SAMPLE_BLOGS);
});

// 3. AI Chat Assistant
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history = [], destinationContext } = req.body;
    const ai = getGeminiClient();

    let contextPrompt = "You are Travel Explorer Assistant, a luxury and smart travel concierge expert.";
    if (destinationContext) {
      contextPrompt += ` Provide suggestions tailored to the destination: ${destinationContext}. Give specific restaurant, hotel, or activity suggestions.`;
    }

    if (ai) {
      // Build simple chat history in Gemini format
      const formattedContents = [];
      for (const msg of history) {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: contextPrompt,
          temperature: 0.7,
        }
      });

      res.json({
        content: response.text || "I'm sorry, I couldn't generate a response. Please try again.",
        aiPowered: true
      });
    } else {
      // Local smart response fallback
      let reply = "";
      const msgLower = message.toLowerCase();
      if (msgLower.includes("hotel")) {
        reply = `To help with your accommodation, I highly recommend looking at local boutique options. For instance, in ${destinationContext || 'your destination'}, hotels like the Sowaka Ryokan (historic, peaceful) or local luxury chains offer exquisite service. Always check ratings and ensure they are walking distance from prime sights!`;
      } else if (msgLower.includes("food") || msgLower.includes("eat") || msgLower.includes("restaurant")) {
        reply = `Sampling the local culinary scene is essential! For ${destinationContext || 'your destination'}, try looking for fine dining establishments with local heritage or cozy street food vendors. Be sure to seek out their local specialties. What kind of food are you in the mood for?`;
      } else if (msgLower.includes("budget") || msgLower.includes("cost")) {
        reply = `Budgeting is key! I recommend setting aside 40% for lodging, 30% for local fine food, 15% for activities, and 15% for shopping and transit. Use our local Budget Calculator tool in the next section to get a perfect estimate.`;
      } else if (msgLower.includes("safe") || msgLower.includes("emergency") || msgLower.includes("danger")) {
        reply = `Safety first! Always carry copies of your ID, secure your cash in separate bags, and research nearby hospitals. If you are in ${destinationContext || 'Kyoto or Rome'}, local crime is very low, but be vigilant against pickpockets near transit centers.`;
      } else {
        reply = `Greetings traveler! As your Travel Explorer assistant, I'm here to curate your trip to ${destinationContext || "your dream destination"}. Ask me about top local attractions, must-try restaurants, weather tips, or packing lists, and I'll map out a stress-free adventure. (Operating in High-Performance Local Assist Mode)`;
      }

      res.json({
        content: reply,
        aiPowered: false
      });
    }
  } catch (error: any) {
    console.error("Error in AI Chat:", error);
    res.json({
      content: "I ran into a small hiccup connecting with our servers, but rest assured our guides are fully loaded below! Here's a tip: explore nearby sights on foot and always register your travel dates.",
      aiPowered: false,
      error: error.message
    });
  }
});

// 4. AI Trip Planner & Itinerary Generator
app.post("/api/generate-itinerary", async (req: Request, res: Response) => {
  try {
    const { destination, days = 3, budget = 150, style = "Solo" } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Create a fully-detailed personalized travel itinerary for a ${days}-day trip to ${destination}. The traveler is using a ${style} travel style with a budget of $${budget} USD per day.
      Generate a valid JSON object matching this schema. Ensure you generate exactly ${days} days, with 3 sequential activities per day (morning, afternoon, evening) representing times like "09:00 AM", "01:00 PM", and "07:00 PM". Provide realistic activity descriptions, estimated costs, and classify activity type as "sightseeing", "dining", "adventure", or "leisure".`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              destinationName: { type: Type.STRING },
              days: { type: Type.INTEGER },
              budget: { type: Type.INTEGER },
              style: { type: Type.STRING },
              daysData: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING },
                          activity: { type: Type.STRING },
                          description: { type: Type.STRING },
                          cost: { type: Type.INTEGER },
                          type: { type: Type.STRING, description: "Must be one of: sightseeing, dining, adventure, leisure" }
                        },
                        required: ["time", "activity", "description", "cost", "type"]
                      }
                    }
                  },
                  required: ["day", "title", "activities"]
                }
              }
            },
            required: ["destinationName", "days", "budget", "style", "daysData"]
          }
        }
      });

      const parsedData = JSON.parse(response.text?.trim() || "{}");
      res.json({ itinerary: parsedData, aiPowered: true });
    } else {
      // Offline high-quality itinerary generator fallback
      const daysData = [];
      const activitiesByStyle: any = {
        Solo: [
          { time: "09:00 AM", activity: "Scenic Walking & Coffee Exploration", description: "Grab a local beverage and walk through historic streets soaking in local design and structure.", cost: 12, type: "leisure" },
          { time: "01:00 PM", activity: "Local Heritage Museum visit", description: "Delve into centuries of history, reading artifacts and viewing dynamic regional exhibits.", cost: 15, type: "sightseeing" },
          { time: "07:00 PM", activity: "Cozy Back-Alley Gastronomy Experience", description: "Dine at a highly-rated countertop local bistro, conversing with local hosts.", cost: 25, type: "dining" }
        ],
        Adventure: [
          { time: "08:30 AM", activity: "Wild Ridge Trekking", description: "Hike steep rocky ridges to reach spectacular scenic view lookouts over the valley.", cost: 10, type: "adventure" },
          { time: "01:30 PM", activity: "High-adrenaline Local Outdoor Sport", description: "Engage in rafting, cycling, or local guided climbing along scenic cliffs.", cost: 75, type: "adventure" },
          { time: "07:00 PM", activity: "Hearty Wood-fired Mountain Barbecue", description: "Fuel up on protein-heavy local dishes at an authentic campfire-themed eatery.", cost: 30, type: "dining" }
        ],
        Luxury: [
          { time: "10:00 AM", activity: "VIP Private Art Gallery Tour", description: "Enjoy a guided walkthrough of custom local masterpieces with private curators.", cost: 90, type: "sightseeing" },
          { time: "01:30 PM", activity: "Gourmet Garden Deck Lunching", description: "Dine on fine-cut fusion ingredients overlooking perfectly manicured estate lawns.", cost: 80, type: "dining" },
          { time: "06:30 PM", activity: "Symphony Orchestration or Premium Opera", description: "Listen to world-class musicians in a historical venue, sipping local vintage wines.", cost: 150, type: "leisure" }
        ],
        Backpacking: [
          { time: "09:00 AM", activity: "Self-Guided Old Town Architecture Walk", description: "Explore magnificent facades and monuments for free using offline route maps.", cost: 0, type: "sightseeing" },
          { time: "01:00 PM", activity: "Street Food Market Tasting Rally", description: "Try three signature local bites from bustling family-run market stalls.", cost: 8, type: "dining" },
          { time: "06:00 PM", activity: "Hostel Social Lounge Gathering", description: "Meet fellow global travelers and swap valuable budget tips over local crafts.", cost: 5, type: "leisure" }
        ]
      };

      const baseActivities = activitiesByStyle[style] || activitiesByStyle["Solo"];

      for (let i = 1; i <= days; i++) {
        daysData.push({
          day: i,
          title: `Discovering ${destination} - Day ${i}`,
          activities: baseActivities.map((act: any, idx: number) => ({
            ...act,
            cost: Math.round(act.cost * (budget / 150)),
            activity: `${act.activity} (Step ${idx + 1})`
          }))
        });
      }

      res.json({
        itinerary: {
          destinationName: destination,
          days,
          budget,
          style,
          daysData
        },
        aiPowered: false,
        note: "API Key offline: Generated high-quality deterministic model itinerary"
      });
    }
  } catch (error: any) {
    console.error("Error in Itinerary Generator:", error);
    res.status(500).json({ error: error.message });
  }
});

// 5. AI Packing List Generator
app.post("/api/generate-packing-list", async (req: Request, res: Response) => {
  try {
    const { destination, season, activities = [] } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Generate a comprehensive travel packing list for a trip to ${destination} during the ${season} season, including activities like ${activities.join(", ")}.
      Return a valid JSON object matching this schema:
      {
        "essentials": ["string", "string"],
        "clothing": ["string", "string"],
        "electronics": ["string", "string"],
        "toiletries": ["string", "string"],
        "activitySpecific": ["string", "string"],
        "proTips": ["string", "string"]
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              essentials: { type: Type.ARRAY, items: { type: Type.STRING } },
              clothing: { type: Type.ARRAY, items: { type: Type.STRING } },
              electronics: { type: Type.ARRAY, items: { type: Type.STRING } },
              toiletries: { type: Type.ARRAY, items: { type: Type.STRING } },
              activitySpecific: { type: Type.ARRAY, items: { type: Type.STRING } },
              proTips: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["essentials", "clothing", "electronics", "toiletries", "activitySpecific", "proTips"]
          }
        }
      });

      res.json({ list: JSON.parse(response.text?.trim() || "{}"), aiPowered: true });
    } else {
      // Local fallback packing list
      const mockList = {
        essentials: [
          "Passport, Visa copies & Travel Insurance files",
          "Credit cards & small cash reserves in local currency",
          "Physical copy of hotel bookings & flight itineraries"
        ],
        clothing: [
          "Lightweight, easily layerable breath-easy tops",
          "Durable walking trousers or comfortable shorts",
          "One upscale dining outfit (matching local dress codes)",
          "Comfortable high-traction walking shoes/sneakers"
        ],
        electronics: [
          "Universal wall plug adapter compatible with local outlets",
          "High-capacity portable power bank (10,000mAh+)",
          "Camera with extra storage cards & charging cords"
        ],
        toiletries: [
          "Travel-size biodegradable shampoo & skin soaps",
          "High SPF reef-safe sunscreen cream",
          "Personal medications & basic emergency first-aid patches"
        ],
        activitySpecific: activities.length > 0 
          ? activities.map((act: string) => `Durable custom gear or accessories tailored for ${act}`)
          : ["Compact water-resistant daypack", "UV protection polarized sunglasses", "Reusable vacuum-sealed water flask"],
        proTips: [
          "Roll, don't fold your clothes to save up to 30% of suitcase volume.",
          "Keep physical copies of critical documents separated from digital devices.",
          "Check weight limits for domestic transport flight legs."
        ]
      };
      res.json({ list: mockList, aiPowered: false });
    }
  } catch (error: any) {
    console.error("Error in Packing List Generator:", error);
    res.status(500).json({ error: error.message });
  }
});

// 6. AI Budget Optimizer
app.post("/api/optimize-budget", async (req: Request, res: Response) => {
  try {
    const { destination, days, budget, style } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const prompt = `Optimize a travel budget of $${budget} USD for a ${days}-day trip to ${destination} using a ${style} style.
      Return a valid JSON object matching this schema:
      {
        "totalCost": 1200,
        "efficiencyScore": 88, // out of 100
        "allocations": [
          { "category": "Accommodation", "amount": 450, "percentage": 37.5, "description": "hotel, ryokan, etc." },
          { "category": "Dining & Food", "amount": 300, "percentage": 25.0, "description": "meals, snacks, and street tasting" },
          { "category": "Local Transit", "amount": 150, "percentage": 12.5, "description": "trains, metro, walking" },
          { "category": "Activities", "amount": 200, "percentage": 16.7, "description": "museum entries, local guide fees" },
          { "category": "Miscellaneous", "amount": 100, "percentage": 8.3, "description": "gifts, emergency reserves, SIM cards" }
        ],
        "savingsTips": ["Tip 1", "Tip 2"],
        "costAlerts": ["Alert 1"]
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              totalCost: { type: Type.INTEGER },
              efficiencyScore: { type: Type.INTEGER },
              allocations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    amount: { type: Type.INTEGER },
                    percentage: { type: Type.NUMBER },
                    description: { type: Type.STRING }
                  },
                  required: ["category", "amount", "percentage", "description"]
                }
              },
              savingsTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              costAlerts: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["totalCost", "efficiencyScore", "allocations", "savingsTips", "costAlerts"]
          }
        }
      });

      res.json({ budget: JSON.parse(response.text?.trim() || "{}"), aiPowered: true });
    } else {
      // Local fallback budget optimization
      const accommodationPct = style === "Luxury" ? 0.45 : style === "Backpacking" ? 0.25 : 0.35;
      const diningPct = style === "Backpacking" ? 0.30 : 0.25;
      const transitPct = style === "Backpacking" ? 0.15 : 0.10;
      const activitiesPct = style === "Adventure" ? 0.30 : 0.20;
      const miscPct = 1 - (accommodationPct + diningPct + transitPct + activitiesPct);

      const allocations = [
        { category: "Accommodation", amount: Math.round(budget * accommodationPct), percentage: Math.round(accommodationPct * 100), description: "Ryokan, Boutique hotels, or social hostels" },
        { category: "Dining & Food", amount: Math.round(budget * diningPct), percentage: Math.round(diningPct * 100), description: "Traditional multi-course dinners and street markets" },
        { category: "Local Transit", amount: Math.round(budget * transitPct), percentage: Math.round(transitPct * 100), description: "Subway passes, bike hires, and express connections" },
        { category: "Activities", amount: Math.round(budget * activitiesPct), percentage: Math.round(activitiesPct * 100), description: "Shrine entries, boat tours, or hiking permits" },
        { category: "Miscellaneous", amount: Math.round(budget * miscPct), percentage: Math.round(miscPct * 100), description: "Traditional souvenirs, local SIM cards, and emergencies" }
      ];

      res.json({
        budget: {
          totalCost: budget,
          efficiencyScore: style === "Backpacking" ? 94 : 85,
          allocations,
          savingsTips: [
            "Purchase regional public transit passes (e.g. JR Pass or Metro tourist cards) before your arrival.",
            "Eat your largest meals at lunch when top-tier local restaurants offer great-value sets.",
            "Book attractions online in advance to bypass ticket queues and capture early bird savings."
          ],
          costAlerts: [
            "Local tourist tax might not be pre-calculated in hotel rates.",
            style === "Luxury" ? "Premium fine dining requires reservations up to 3 months in advance." : "Keep a backup cache of physical cash for remote temple towns."
          ]
        },
        aiPowered: false
      });
    }
  } catch (error: any) {
    console.error("Error in Budget Optimizer:", error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend assets in production and Vite middleware in development
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} [ENV: ${process.env.NODE_ENV || 'development'}]`);
  });
}

bootstrap();
