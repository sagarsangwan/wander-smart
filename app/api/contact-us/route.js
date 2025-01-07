import prisma from "@/lib/prisma";

export async function POST(request) {
  const data = await request.json();

  try {
    const newSubmission = await prisma.Feedback.create({
      data: data,
    });
    return Response.json({
      message: "Thank you your query has been submitted",
      data: newSubmission,
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
