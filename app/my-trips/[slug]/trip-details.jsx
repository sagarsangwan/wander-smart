"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clock, DollarSign, Utensils, Phone, Camera } from 'lucide-react'

import { generateStyledPDF } from './pdf-creator'
function TripDetails({ tripData }) {
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
                            <button onClick={() => generateStyledPDF(tripData)}>Download Styled PDF</button>

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

export default TripDetails
