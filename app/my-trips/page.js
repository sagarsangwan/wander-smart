import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { all } from 'axios'
import React from 'react'

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
            <p className='text-2xl'>Hi, {session.user.name}</p>
            <div>
                {allItineraris.map((itinerary) => {
                    const cItinerary = JSON.parse(itinerary.itinerary)
                    console.log(cItinerary.trip_name)

                    // < div key = { itinerary.id } > { itinerary.itinerary[0] } < div />

                })}
            </div>
        </div>

    )
}

export default page
