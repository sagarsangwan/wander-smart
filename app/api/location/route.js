import axios from "axios"
export async function POST(request) {
    try {
        const { q } = await request.json()

        if (!q || q.length < 3) {
            const res = JSON.stringify({ error: "search at least 3 word" })
            return Response.json({ res })
        }
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

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "ERR_BAD_REQUEST" }),
            { status: 500 }
        );
    }
}