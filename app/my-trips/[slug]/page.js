
import prisma from '@/lib/prisma'
import TripDetails from './trip-details'


export default async function page({ params }) {
    const currentSlug = params.slug
    const tripData = await prisma.TripPlan.findUnique({
        where: {
            slug: currentSlug
        }
    })
    return (
        <TripDetails tripData={tripData} />
    )
}



