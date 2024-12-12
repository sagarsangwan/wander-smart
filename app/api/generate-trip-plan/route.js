const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function run() {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
}

export async function POST(request) {
    const travelPrompt = `Generate travel plan for ${destination} for ${tripDuration} for ${groupSize}, Give me a hotel options list with HotelName, Hotel address, Price, Rating, hotel booking url, description and suggest itinerary with Place name , ticket pricing, rating, time travel for each location for ${tripDuration} with each day plan with best time to visit in JSON FORMAT `
    try {
        const data = await request.json()
        const destination = data["destination"]
        const tripDuration = data["tripDuration"]
        const groupSize = data["groupSize"]
        // const activities = data["activities"]
        const budget = data["budget"]
        console.log(data)
        return Response(JSON.stringify({ status: 200 }))
    } catch (e) {
        return new Response(e)
    }
}
