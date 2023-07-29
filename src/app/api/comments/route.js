import { connectToDB } from "@/connection/connectToDB";
import Comments from "@/models/Comments";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const CommentsDB = await Comments.find()
      .populate("creator")
      .sort({ createdAt: -1 });

    return NextResponse.json(CommentsDB, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
