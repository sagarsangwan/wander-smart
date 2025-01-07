import prisma from "@/lib/prisma";

export async function POST(request, { params }) {
  const currentTripPlanID = await params.id;
  console.log(currentTripPlanID);
  try {
    const currentTripPlan = await prisma.TripPlan.update({
      where: { id: currentTripPlanID },
      data: {
        isDeleted: true,
      },
    });
    return Response.json({
      message: "Your Trip plan has been deleted",
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return Response.json({
      message: "Something went wrong please try after sometime ",
      status: 500,
    });
  }
}
