// import React from 'react'

// function page({ params }) {
//     console.log(params)
//     const currentId = params.tripId
//     return (
//         <div>

//         </div>
//     )
// }
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clock, DollarSign, Utensils, Phone, Camera, Hotel, MapPin } from 'lucide-react'
import prisma from '@/lib/prisma'

// This would typically come from an API or props
const tripData = {
    trip_name: "Exploring the Wonders of Kyoto",
    trip_description: "Immerse yourself in the rich culture and history of Japan's ancient capital",
    time_to_read: "5",
    average_budget_per_person: "¥15,000",
    travel_tips: ["Carry cash as many places don't accept cards", "Get a Japan Rail Pass for convenient travel", "Learn basic Japanese phrases"],
    local_cuisines: ["Kaiseki", "Yudofu", "Matcha desserts"],
    emergency_contacts: {
        local_police: "110",
        nearest_hospital: "Kyoto City Hospital: +81 75-311-5311",
        tourist_help_center: "Kyoto City Tourist Information Center: +81 75-343-0548"
    },
    cultural_etiquette: "Remove shoes before entering temples, homes, and some restaurants. Bow when greeting people. Avoid eating while walking.",
    photography_spots: ["Kinkaku-ji (Golden Pavilion)", "Arashiyama Bamboo Grove", "Fushimi Inari Shrine"],
    hotel_details: [
        {
            HotelName: "Kyoto Granbell Hotel",
            "Hotel address": "317 Yamazaki-cho, Nakagyo Ward, Kyoto, 604-8031",
            Price: "¥15,000 per night",
            Rating: "4.5",
            "hotel booking url": "https://example.com/kyoto-granbell-hotel",
            description: "Modern hotel with traditional Japanese elements, close to Nishiki Market"
        }
    ],
    daily_wise_itinerary_plan: [
        {
            day: 1,
            best_time_to_visit: "Morning",
            places: [
                {
                    "Place name": "Kinkaku-ji (Golden Pavilion)",
                    "ticket pricing": "¥400",
                    rating: "4.7",
                    "time travel": "2 hours",
                    must_try_experience: "Take a peaceful walk around the mirror pond"
                },
                {
                    "Place name": "Ryoan-ji Temple",
                    "ticket pricing": "¥500",
                    rating: "4.5",
                    "time travel": "1.5 hours",
                    must_try_experience: "Meditate in front of the famous rock garden"
                }
            ]
        },
        {
            day: 2,
            best_time_to_visit: "Early Morning",
            places: [
                {
                    "Place name": "Fushimi Inari Shrine",
                    "ticket pricing": "Free",
                    rating: "4.8",
                    "time travel": "3 hours",
                    must_try_experience: "Hike through the thousands of torii gates"
                },
                {
                    "Place name": "Nishiki Market",
                    "ticket pricing": "Free (pay for food)",
                    rating: "4.6",
                    "time travel": "2 hours",
                    must_try_experience: "Try various local street foods and delicacies"
                }
            ]
        }
    ]
}

export default async function page({ params }) {
    const currentId = params.tripId
    const tripData = await prisma.TripPlan.findUnique({
        where: {
            id: currentId
        }
    })
    return (
        <div className="container mx-auto p-4 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{tripData.tripName}</CardTitle>
                    <CardDescription className="text-lg">{tripData.tripDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {tripData.timeToRead} min read
                        </div>
                        <div className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Avg. {tripData.averageBudgetPerPerson} per person
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Travel Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            {tripData.travelTips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Local Cuisines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="grid grid-cols-2 gap-2">
                            {tripData.localCuisines.map((cuisine, index) => (
                                <li key={index} className="flex items-center">
                                    <Utensils className="mr-2 h-4 w-4" />
                                    {cuisine}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {Object.entries(tripData.emergencyContacts).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                                <Phone className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">{key.replace(/_/g, ' ')}:</span>
                                {value}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Cultural Etiquette</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{tripData.culturalEtiquette}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Photography Spots</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tripData.photographySpots.map((spot, index) => (
                            <li key={index} className="flex items-center">
                                <Camera className="mr-2 h-4 w-4" />
                                {spot}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Hotel Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        {tripData.hotelDetails.map((hotel, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                                <h3 className="text-lg font-semibold">{hotel.HotelName}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{hotel['Hotel address']}</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge>{hotel.Price}</Badge>
                                    <Badge variant="secondary">Rating: {hotel.Rating}</Badge>
                                </div>
                                <p className="text-sm mb-2">{hotel.description}</p>
                                <a href={hotel['hotel booking url']} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                    Book Now
                                </a>
                                {index < tripData.hotelDetails.length - 1 && <Separator className="my-4" />}
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Daily Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {tripData.itineraryPlan.map((day, index) => (
                            <AccordionItem key={index} value={`day-${day.day}`}>
                                <AccordionTrigger>Day {day.day} - {day.best_time_to_visit}</AccordionTrigger>
                                <AccordionContent>
                                    {day.places.map((place, placeIndex) => (
                                        <div key={placeIndex} className="mb-4 last:mb-0">
                                            <h4 className="font-semibold">{place['Place name']}</h4>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>Ticket: {place['ticket pricing']}</div>
                                                <div>Rating: {place.rating}</div>
                                                <div>Duration: {place['time travel']}</div>
                                            </div>
                                            <p className="text-sm mt-2">
                                                <span className="font-medium">Must try:</span> {place.must_try_experience}
                                            </p>
                                            {placeIndex < day.places.length - 1 && <Separator className="my-2" />}
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}



