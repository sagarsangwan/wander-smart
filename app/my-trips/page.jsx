import React from 'react'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import TripPlanOverView from '@/components/TripPlanOverView'

export default async function page() {
    const session = await auth()
    let tripPlans
    if (session) {
        tripPlans = await prisma.TripPlan.findMany({
            where: {
                userId: session.user.id
            }
        })
    }
    if (!session) {
        return redirect('/login')
    }
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Explore Trip Plans</h1>
            <TripPlanOverView tripPlans={tripPlans} />
        </div>
    )
}


