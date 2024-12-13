import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Badge } from "@/components/ui/badge"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function page() {
    const session = await auth()
    const allItineraris = await prisma.TripItineraryPlan.findMany({
        where: {
            userId: session.user.id
        }
    })
    // console.log(allItineraris)
    return (
        <div className='flex justify-center'>
            <div>

                <p className='text-2xl'>Hi, {session.user.name}</p>
                <div>
                    {allItineraris.map((itinerary) => (
                        <Card key={itinerary.id} >
                            <CardHeader>
                                <CardTitle>{itinerary.tripName} <Badge variant="outline">{itinerary.timeToRead}</Badge>
                                </CardTitle>
                                <CardDescription>{itinerary.tripDescription}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <Button>
                                    <Link href={`/my-trips/${itinerary.id}`}>View Full</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        // <div key={itinerary.id}>
                        //     <p className='text-xl'>{itinerary.tripName}</p>
                        // </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default page
