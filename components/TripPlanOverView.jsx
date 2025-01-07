"use client";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Calendar, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { generateStyledPDF } from "@/app/my-trips/[slug]/pdf-creator";
function TripPlanOverView({ tripPlans }) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tripPlans.length === 0 && (
          <div>
            <Button>
              <Link href="/create-trip">Start Planning </Link>
            </Button>
          </div>
        )}
        {tripPlans.map((trip) => (
          <Card key={trip.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{trip.tripName}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {trip.destination}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {trip.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {trip.duration} days
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  {/* <DollarSign className="mr-1 h-4 w-4" /> */}
                  {trip.averageBudgetPerPerson}/day
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {trip.timeToRead} min read
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Highlights:</h4>
                <ScrollArea className="h-[80px]">
                  <ul className="list-disc pl-5 space-y-1">
                    {trip.photographySpots.map((photographySpot, index) => (
                      <li key={index} className="text-sm">
                        {photographySpot}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter className="gap-1">
              <Button className="">
                <Link href={`/my-trips/${trip.slug}`}>View Full Itinerary</Link>
              </Button>
              <Button onClick={() => generateStyledPDF(trip)}>PDF </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TripPlanOverView;
