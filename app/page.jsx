import { Calendar, MapPin, Sparkles } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import HeroSection from "@/components/hero-section";
import { auth } from "@/lib/auth";
import TripPlanOnHomePage from "@/components/TripPlanOverView";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const tripPlans = await prisma.TripPlan.findMany({
    where: { isDeleted: false },
  });
  const faqs = [
    {
      question: "What is Wander Smart?",
      answer:
        "Wander Smart is a platform designed to help travelers plan their trips with ease, offering smart tools and resources to make every journey memorable.",
    },
    {
      question: "How can Wander Smart enhance my travel experience?",
      answer:
        "We provide curated travel guides, budget-friendly suggestions, and smart tools to streamline your trip planning and execution.",
    },
    {
      question: "What are Wander Smart Tokens, and how do I use them?",
      answer:
        "Wander Smart Tokens are our in-app currency that lets you generate a trip 1 token == 1 trip generation. Each token costs 20 Rupees, with discounts available for bulk purchases, such as 10% off for 10 tokens and 15% off for 20 tokens. You can purchase tokens through our platform using your preferred payment method.",
    },
    {
      question: "Can I access Wander Smart offline?",
      answer:
        "Yes, once your itinerary is created, you can download pdf for offline access.",
    },
    {
      question: "Who do I contact for support?",
      answer:
        "You can reach out to our support team at [support email/phone number] for any queries or issues.",
    },
    {
      question: "Can Wander Smart help with travel insurance or safety tips?",
      answer:
        "Yes! We offer resources on travel safety, including recommended insurance providers and health guidelines.",
    },
  ];

  return (
    <div className="">
      <HeroSection />
      {/* feature section */}
      {!session && (
        <div className="mb-5">
          <div className="text-center py-12">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Why Choose WanderSmart?
              <br />
              <span className="text-xl text-gray-500">
                Experience the future of travel planning with our AI-powered
                platform.
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
            <div className=" flex flex-col text-center items-center gap-3">
              <div className="flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white">
                <MapPin />
              </div>

              <p className="font-medium text-lg">AI-Curated Destinations</p>
              <p className="text-gray-500">
                Discover hidden gems and popular spots tailored to your
                preferences.
              </p>
            </div>
            <div className=" flex flex-col text-center items-center gap-3">
              <div className="flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white">
                <Calendar />
              </div>

              <p className="font-medium text-lg">Smart Itineraries</p>
              <p className="text-gray-500">
                Get day-by-day plans optimized for your time and interests.
              </p>
            </div>
            <div className=" flex flex-col text-center items-center gap-3">
              <div className="flex justify-center items-center h-10 w-10 rounded-md  bg-rose-500 text-white">
                <Sparkles />
              </div>

              <p className="font-medium text-lg">Personalized Experiences</p>
              <p className="text-gray-500">
                Enjoy recommendations that match your unique travel style.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* all trip plansss */}
      {tripPlans.length > 0 && (
        <section className="px-4 mt-10">
          <h1 className="text-xl font-semibold md:text-3xl mb-6">
            Explore Trip Plan From Other
          </h1>
          <TripPlanOnHomePage tripPlans={tripPlans} />
        </section>
      )}

      {/* faqs section */}
      <div className="mt-10">
        <div className="text-center py-12">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </p>
        </div>
        {faqs.map((faq, index) => (
          <Accordion type="single" key={index} collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
