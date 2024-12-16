import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Badge } from "@/components/ui/badge"


import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react'
import { redirect } from 'next/navigation'



export default async function page() {
    const session = await auth()
    const tripsData = await prisma.TripPlan.findMany({
        where: {
            userId: session.user.id
        }
    })
    if (!session) {
        return redirect('/login')
    }
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Explore Trip Plans</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tripsData.map((trip) => (
                    <Card key={trip.id} className="flex flex-col">
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
                                <Link href={`/my-trips/${trip.id}`}>View Full Itinerary</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}


