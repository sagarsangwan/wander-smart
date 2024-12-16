import { Calendar, MapPin, Sparkles } from 'lucide-react'
import React from 'react'

function FeatureSetion() {
    const allQuestions = [
        {
            question: "How does WanderSmart use AI to plan trips?",
            answer: "WanderSmart leverages Gemini AI to analyze vast amounts of travel data, user preferences, and real-time information to create personalized trip itineraries. The AI considers factors like your interests, budget, and travel style to suggest the best destinations, activities, and accommodations."
        },
        {
            question: "Is my personal information safe with WanderSmart?",
            answer: "Absolutely. We take data privacy very seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent."
        },
        {
            question: "Can I customize the AI-generated itineraries?",
            answer: "Yes! While our AI creates a great starting point, you have full control to modify and customize your itinerary. Add, remove, or rearrange activities to make your trip uniquely yours."
        },
        {
            question: "How much does WanderSmart cost?",
            answer: "WanderSmart operates on a token-based system. You can purchase tokens to unlock trip planning features. Visit our pricing page for more details on our flexible plans and current promotions."
        }
    ]
    return (
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-10'>
            <div className=' flex flex-col text-center items-center gap-3'>
                <div className='flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white'>
                    <MapPin />
                </div>

                <p className='text-3xl'>AI-Curated Destinations
                </p>
                <p>Discover hidden gems and popular spots tailored to your preferences.

                </p>
            </div>
            <div className=' flex flex-col text-center items-center gap-3'>
                <div className='flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white'>
                    <Calendar />
                </div>

                <p className='text-3xl'>Smart Itineraries

                </p>
                <p>
                    Get day-by-day plans optimized for your time and interests.


                </p>
            </div><div className=' flex flex-col text-center items-center gap-3'>
                <div className='flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white'>
                    <Sparkles />
                </div>

                <p className='text-3xl'>
                    Personalized Experiences
                </p>
                <p>
                    Enjoy recommendations that match your unique travel style.


                </p>
            </div>

        </div>
    )
}

export default FeatureSetion
