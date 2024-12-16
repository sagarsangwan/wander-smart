import { Calendar, MapPin, Sparkles } from 'lucide-react'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import HeroSection from "@/components/hero-section";
import { WanderSmartLogo } from '@/components/ui/logo';
import Link from 'next/link';

export default async function Home() {
  const faqs = [
    {
      question: "What is Wander Smart?",
      answer: "Wander Smart is a platform designed to help travelers plan their trips with ease, offering smart tools and resources to make every journey memorable.",
    },
    {
      question: "How can Wander Smart enhance my travel experience?",
      answer: "We provide curated travel guides, budget-friendly suggestions, and smart tools to streamline your trip planning and execution.",
    },
    {
      question: "What are Wander Smart Tokens, and how do I use them?",
      answer: "Wander Smart Tokens are our in-app currency that lets you access premium features such as personalized itineraries, expert advice, and travel discounts. Each token costs 20 Rupees, with discounts available for bulk purchases, such as 10% off for 10 tokens and 15% off for 20 tokens. You can purchase tokens through our platform using your preferred payment method.",
    },
    {
      question: "Can I access Wander Smart offline?",
      answer: "Yes, once your itinerary is created, you can download pdf for offline access.",
    },
    {
      question: "Who do I contact for support?",
      answer: "You can reach out to our support team at [support email/phone number] for any queries or issues.",
    },
    {
      question: "Can Wander Smart help with travel insurance or safety tips?",
      answer: "Yes! We offer resources on travel safety, including recommended insurance providers and health guidelines.",
    },
  ];

  return (
    <div className="" >
      <HeroSection />
      {/* feature section */}
      <div>
        <div className='text-center py-12'>
          <p className='text-3xl md:text-4xl lg:text-5xl font-bold'>
            Why Choose WanderSmart?
            <br />
            <span className='text-xl text-gray-500'>
              Experience the future of travel planning with our AI-powered platform.

            </span>
          </p>
        </div>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 '>
          <div className=' flex flex-col text-center items-center gap-3'>
            <div className='flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white'>
              <MapPin />
            </div>

            <p className='text-3xl'>AI-Curated Destinations
            </p>
            <p className='text-gray-500'>Discover hidden gems and popular spots tailored to your preferences.

            </p>
          </div>
          <div className=' flex flex-col text-center items-center gap-3'>
            <div className='flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white'>
              <Calendar />
            </div>

            <p className='text-3xl'>Smart Itineraries

            </p>
            <p className='text-gray-500'>
              Get day-by-day plans optimized for your time and interests.


            </p>
          </div>
          <div className=' flex flex-col text-center items-center gap-3'>
            <div className='flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white'>
              <Sparkles />
            </div>

            <p className='text-3xl'>
              Personalized Experiences
            </p>
            <p className='text-gray-500'>
              Enjoy recommendations that match your unique travel style.


            </p>
          </div>

        </div>
      </div>
      {/* faqs section */}
      <div className='mt-10'>
        <div className='text-center py-12'>
          <p className='text-3xl md:text-4xl lg:text-5xl font-bold'>
            Frequently Asked Questions

          </p>
        </div>
        {faqs.map((faq, index) => (
          <Accordion type="single" key={index} collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      {/* footer */}
      <footer className='mt-10'>
        <div className='flex justify-between'>
          <div>
            <WanderSmartLogo className="w-40 h-auto sm:w-30" />
          </div>
          <ul className='flex gap-3'>
            <li>
              <Link href={"/terms"} className='text-red-500'>
                Terms
              </Link>
            </li>
            <li>
              <Link className='text-red-500' href={'/privacy'}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href={"/contace-us"} className='text-red-500'>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <p className='w-full text-center py-8'>© 2024 WanderSmart. All rights reserved.</p>
      </footer>

    </div >
  );
}
