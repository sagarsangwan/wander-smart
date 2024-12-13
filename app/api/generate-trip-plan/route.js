import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { it } from "date-fns/locale";
import { NextResponse } from "next/server";
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");



const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export async function POST(request) {
    const session = await auth()

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
          "time travel": "string"
        }
      ]
    }
  ]
}

The response must:
- Begin and end with curly braces .
- Include all fields, even if some fields are empty.
- Contain no additional explanations or text outside the JSON format.
Strictly adhere to this structure.`

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
        console.log(tripName, hotelDetails, itineraryPlan)
        const TripItineraryPlan = await prisma.TripItineraryPlan.create({
            data: {
                tripName: tripName,
                hotelDetails: hotelDetails,
                itineraryPlan: itineraryPlan,
                userId: session.user.id
            }
        })

        return NextResponse.json({ message: "heheheh your itinerary is generated ", data: TripItineraryPlan, status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: e, status: 500 })
    }
}
