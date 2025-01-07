"use server";
import prisma from "@/lib/prisma";
import TripDetails from "./trip-details";

export async function generateMetadata({ params }) {
  const currentSlug = await params.slug;
  const tripData = await prisma.TripPlan.findUnique({
    where: {
      slug: currentSlug,
    },
  });
  if (!tripData) {
    return {
      title: "Trip Not Found",
      description: "This trip plan is not available.",
    };
  }
  return {
    title: tripData.tripName,
    description: tripData.tripDescription,
  };
}

export default async function page({ params }) {
  const currentSlug = params.slug;
  const tripData = await prisma.TripPlan.findUnique({
    where: {
      slug: currentSlug,
    },
  });
  if (!tripData) {
    return (
      <div className="h-screen flex">
        <p className=" justify-center items-center m-auto">
          no trip detail found...................
        </p>
      </div>
    );
  }
  return <TripDetails tripData={tripData} />;
}
