import { connectToDB } from "@/connection/connectToDB";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const PostsDB = await Posts.find({ creator: params?.userId?.toString() })
      .populate("creator")
      .sort({ createdAt: -1 });

    return NextResponse.json(PostsDB, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
