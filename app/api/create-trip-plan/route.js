import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import updateUserBalance from "@/lib/updateUserBalance";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth();

  try {
    const responseFromGemeni = await request.json();
    console.log(responseFromGemeni);
    const updatedUserData = await updateUserBalance();
    console.log(updatedUserData);
    const [TripPlan, updatedUser] = await prisma.$transaction([
      prisma.TripPlan.create({
        data: responseFromGemeni,
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: updatedUserData,
      }),
    ]);

    return NextResponse.json({
      message: "heheheh your itinerary is generated ",
      data: TripPlan,
      updatedUser: updatedUser,
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e, status: 500 });
  }
}
