import React from 'react'

import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'
function TripOverView({trip}) {
  return (
    
                    <Card  className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{trip.tripName}</CardTitle>
                            <CardDescription className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {trip.destination}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-4">{trip.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {trip.duration} days
                                </Badge>
                                <Badge variant="outline" className="flex items-center">
                                    <DollarSign className="mr-1 h-4 w-4" />
                                    {trip.averageBudgetPerPerson}/day
                                </Badge>
                                <Badge variant="outline" className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    {trip.timeToRead} min read
                                </Badge>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Highlights:</h4>
                                <ScrollArea className="h-[80px]">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {trip.photographySpots.map((photographySpot, index) => (
                                            <li key={index} className="text-sm">{photographySpot}</li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <Link href={`/my-trips/${trip.slug}`}>View Full Itinerary</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                
    
  )
}

export default TripOverView
 