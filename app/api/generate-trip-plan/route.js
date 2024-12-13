import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
        const travelPrompt = `Generate travel plan for ${destination} with a ${budget} budget for ${tripDuration} for ${groupSize}, Give me a hotel options list with HotelName, Hotel address, Price, Rating, hotel booking url, description and suggest itinerary with Place name , ticket pricing, rating, time travel for each location for ${tripDuration} with each day plan with best time to visit in JSON FORMAT `


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
        const itineraryPlan = await prisma.ItineraryPlan.create({
            data: {
                itinerary: aiResult,
                userId: session.user.id
            }
        })

        return NextResponse.json({ message: "heheheh your itinerary is generated ", data: itineraryPlan, status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: e, status: 500 })
    }
}
