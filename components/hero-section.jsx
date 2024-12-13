"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import heroimage from '../public/heroimage.svg'
import { FlipWords } from './ui/flip-words'
import Image from 'next/image'
import { useSession } from "next-auth/react"
function HeroSection() {
    const { data: session } = useSession()

    const words = ["Expedition", "Voyage", "Journey", "Adventure"];
    // if (!session) {
    //     return <p>You are not logged in</p>;
    // }
    return (
        <section className="flex flex-col  items-center justify-center space-y-10">
            <div className='w-full  justify-center text-center '>
                <div className='text-3xl md:text-4xl lg:text-5xl font-bold'> Unlock Your Next <span className=' text-rose-500'> <FlipWords words={words} /> with Wandet Smart!</span>
                </div> <br />
                {/* <p>
                    Experience Customized Travel Plans Crafted by Intelligent AI Just for You.
                </p> */}
                <p className='mb-16'>
                    Unleash your travel potential with our intelligent itinerary planner. Simply input your destination, preferences, and travel dates, and let us create a personalized journey tailored just for you. Discover hidden gems, must-see attractions, and curated experiences that make your trip unforgettable. Start exploring today and turn your travel dreams into reality!
                </p>
                <div className='flex items-center justify-center'>

                    <Button>
                        {session?.user ?
                            <Link href="/create-trip">Book Your Trip  </Link>
                            :
                            <Link href="/login">Book Your Trip  </Link>

                        }
                    </Button>
                </div>
            </div>
            <div className=' '>
                <Image src={heroimage} alt="heroimage" />
            </div>
        </section>
    )
}

export default HeroSection
