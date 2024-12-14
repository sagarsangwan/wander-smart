
import prisma from '@/lib/prisma'
import TripDetails from './trip-details'


export default async function page({ params }) {
    const currentId = params.tripId
    const tripData = await prisma.TripPlan.findUnique({
        where: {
            id: currentId
        }
    })
    return (
        <TripDetails tripData={tripData} />
    )
}



