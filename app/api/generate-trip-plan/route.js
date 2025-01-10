import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "application/json",
};

export async function POST(request) {
  const generateSlug = (tripName, uniqueId) => {
    const sanitized = tripName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Keep only alphanumeric, spaces, and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

    return `${sanitized}-${uniqueId}`;
  };
  const session = await auth();
  if (session?.user?.balance === 0 && session.user?.freePlanUsed === 3) {
    return NextResponse.json({
      message: "u don't have any credit",
      status: 500,
    });
  }
  try {
    const data = await request.json();
    const destination = data["destination"];
    const tripDuration = data["tripDuration"];
    const groupSize = data["groupSize"];
    const budget = data["budget"];
    const travelPrompt = `Generate a travel plan for ${destination} with a ${budget} budget for ${tripDuration} days for a group size of ${groupSize}.
The response must be in **valid JSON format** and follow this structure exactly:

{
  "trip_name": "A descriptive name for the trip based on the destination",
  "trip_description": "A description for the destination place",
  "time_to_read": "calculate time to read this travel plan in minute",
  "average_budget_per_person": "calculated average budget per person",
  "travel_tips": ["Tip 1", "Tip 2", "Tip 3"],
  "local_cuisines": ["Dish 1", "Dish 2", "Dish 3"],
  "emergency_contacts": {
    "local_police": "string",
    "nearest_hospital": "string",
    "tourist_help_center": "string"
  },
  "cultural_etiquette": "Any dos and don'ts for tourists visiting the location",
  "photography_spots": ["Spot 1", "Spot 2", "Spot 3"],
  "hotel_details": [
    {
      "HotelName": "string",
      "Hotel address": "string",
      "Price": "string",
      "Rating": "string or number",
      "hotel booking url": "string",
      "description": "string"
    }
  ],
  "daily_wise_itinerary_plan": [
    {
      "day": "integer (1, 2, 3, etc.)",
      "best_time_to_visit": "string (e.g., 'Morning')",
      "places": [
        {
          "Place name": "string",
          "ticket pricing": "string",
          "rating": "string or number",
          "time travel": "string",
          "must_try_experience": "string (e.g., 'Try the local street food')"
        }
      ]
    }
  ]
}

The response must:
- Begin and end with curly braces .
- add some emojis for better readability in all trip plan.
- Include all fields, even if some fields are empty.
- include nearby maximum hotels availabe in the ${budget} budget.
- Contain no additional explanations or text outside the JSON format.
Strictly adhere to this structure.`;

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const response = await chatSession.sendMessage(travelPrompt);
    const aiResult = response.response.text();
    const parsedAiResult = JSON.parse(aiResult);
    const tripPlanFromGemen = {
      tripName: parsedAiResult.trip_name,
      destination: destination,
      duration: String(tripDuration),
      hotelDetails: parsedAiResult.hotel_details,
      itineraryPlan: parsedAiResult.daily_wise_itinerary_plan,
      tripDescription: parsedAiResult.trip_description,
      timeToRead: parsedAiResult.time_to_read,
      averageBudgetPerPerson: parsedAiResult.average_budget_per_person,
      travelTips: parsedAiResult.travel_tips,
      localCuisines: parsedAiResult.local_cuisines,
      emergencyContacts: parsedAiResult.emergency_contacts,
      culturalEtiquette: parsedAiResult.cultural_etiquette,
      photographySpots: parsedAiResult.photography_spots,

      userId: session.user.id,
      slug: generateSlug(parsedAiResult.trip_name, Date.now().toString()),
    };

    return NextResponse.json({
      message:
        "heheheh your itinerary is generated from gemeni ai please wait while we updating your trip to database ",
      data: tripPlanFromGemen,
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e, status: 500 });
  }
}
