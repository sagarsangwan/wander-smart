import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");



const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(request) {
  const generateSlug = (tripName, uniqueId) => {
    // Step 1: Remove special characters and emojis
    const sanitized = tripName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Keep only alphanumeric, spaces, and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  
    // Step 2: Append a unique identifier to ensure uniqueness
    return `${sanitized}-${uniqueId}`;
  };
  const session = await auth()
  if (session?.user?.balance === 0 && session.user?.freePlanUsed === 3) {
    return NextResponse.json({ message: "u don't have any credit", status: 500 },)
  }
  try {
    const data = await request.json()
    const destination = data["destination"]
    const tripDuration = data["tripDuration"]
    const groupSize = data["groupSize"]
    const budget = data["budget"]
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
Strictly adhere to this structure.`
    // "transportation_options ": [
    //   {
    //     "mode": "Bus/Taxi/Rental Car/Train",
    //     "cost": "string",
    //     "duration": "string"
    //   }
    // ],
    //   "weather_forecast": "Expected weather for 3 days from now (e.g., 'Sunny, 25°C')",

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });

    const response = await chatSession.sendMessage(travelPrompt);
    const aiResult = response.response.text()
    const parsedAiResult = JSON.parse(aiResult)
    const tripName = parsedAiResult.trip_name
    const hotelDetails = parsedAiResult.hotel_details
    const itineraryPlan = parsedAiResult.daily_wise_itinerary_plan
    const tripDescription = parsedAiResult.trip_description
    const timeToRead = parsedAiResult.time_to_read
    const averageBudgetPerPerson = parsedAiResult.average_budget_per_person
    const travelTips = parsedAiResult.travel_tips
    // const constweatherForcast =parsedAiResult
    const localCuisines = parsedAiResult.local_cuisines
    const emergencyContacts = parsedAiResult.emergency_contacts
    const culturalEtiquette = parsedAiResult.cultural_etiquette
    const photographySpots = parsedAiResult.photography_spots
    const uniqueId = Date.now().toString(); 
    const slug = generateSlug(tripName,uniqueId )
    // console.log(timeToRead)
    const TripPlan = await prisma.TripPlan.create({
      data: {
        tripName: tripName,
        destination: destination,
        hotelDetails: hotelDetails,
        itineraryPlan: itineraryPlan,
        tripDescription: tripDescription,
        timeToRead: timeToRead,
        userId: session.user.id,
        averageBudgetPerPerson: averageBudgetPerPerson,
        travelTips: travelTips,
        localCuisines: localCuisines,
        emergencyContacts: emergencyContacts,
        culturalEtiquette: culturalEtiquette,
        photographySpots: photographySpots,
        duration: String(tripDuration),
        slug:slug
      }
    })
    let updatedUser
    if (session?.user?.balance > 1) {
      console.log("balance haiiiiiiiiiiiiii")
      const totalBalanceUsed = session.user?.totalBalanceUsed + 1
      const balance = session.user?.balance - 1
      const balanceUsed = session.user?.balanceUsed + 1
      updatedUser = await prisma.user.update({
        where: { id: session?.user?.id },
        data: {
          balanceUsed: balanceUsed,
          balance: balance,
          totalBalanceUsed: totalBalanceUsed
        }
      })
    }
    if (session?.user?.balance === 0 && session.user?.freePlanUsed < 3) {
      console.log("balance nhiiiiii haiiiiiiiiiiiiii free quota haiiiiiiiiiiiiiiiii")

      const freePlanUsed = session.user?.freePlanUsed + 1
      const totalBalanceUsed = session.user?.totalBalanceUsed + 1
      updatedUser = await prisma.user.update({
        where: { id: session?.user?.id },
        data: {
          totalBalanceUsed: totalBalanceUsed,
          freePlanUsed: freePlanUsed
        }
      })
    }


    return NextResponse.json({ message: "heheheh your itinerary is generated ", data: TripPlan, updatedUser: updatedUser, status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: e, status: 500 })
  }
}
