import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { redirect } from 'next/navigation'
import TripOverView from '@/components/tripOverView'

export default async function page() {
    const session = await auth()
    let tripsData
    if (session) {
        tripsData = await prisma.TripPlan.findMany({
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tripsData.length === 0 && (
                    <div>
                        <Button>

                            <Link href="/create-trip">Start Planning  </Link>
                        </Button>
                    </div>
                )}
                { tripsData.map((trip)=>(
                    <div key={trip.id}> <TripOverView trip={trip}/> </div>
                ))

                }
            </div>
        </div>
    )
}


