import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this content because you are signed in.",
      you: session?.user,
    });
  } else {
    return NextResponse.json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
