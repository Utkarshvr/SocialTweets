import User from "@/models/User";
import { connectToDB } from "@/connection/connectToDB";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const PostsDB = await Posts.find()
      .populate("creator")
      .sort({ createdAt: -1 });

    return NextResponse.json(PostsDB, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const { userId, body, image } = await req.json();
    console.log({ userId, body, image });

    const Creator = await User.findById(userId);
    const Post = await Posts.create({ creator: userId, body, image });
    await Creator.updateOne({ $inc: { numPosts: 1 } });

    // const populatedPost = await Posts.findById(Post._id).populate("creator");

    return NextResponse.json(Post, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
