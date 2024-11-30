import axios from "axios"
export async function POST(request) {
    try {
        const { q } = await request.json()
        console.log(q, "---------------------------------------------------------------------------")

        if (!q || q.length < 3) {
            const res = JSON.stringify({ error: "search at least 3 word" })
            return Response.json({ res })
        }
        console.log(q, "-------------------------------------")
        const response = await axios.get("https://us1.locationiq.com/v1/autocomplete.php",
            {
                params: {
                    key: process.env.LOCATIONIQ_API_KEY, // Secure token
                    q,
                    limit: 5,
                    // countrycodes: 
                }
            }
        )

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("Error fetching autocomplete data:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch autocomplete data" }),
            { status: 500 }
        );
    }
}