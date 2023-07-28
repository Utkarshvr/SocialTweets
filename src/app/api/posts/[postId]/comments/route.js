// import User from "@/models/User";
import { connectToDB } from "@/connection/connectToDB";
import Comments from "@/models/Comments";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const CommentsDB = await Comments.find({ post: params.postId })
      .populate("creator")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json(CommentsDB, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectToDB();

    const { comment, userId } = await req.json();

    const Post = await Posts.findById(params.postId);
    console.log({ Post });
    // If Post not found then it doesn't make sense to move forward
    if (!!!Post) return;

    const Comment = await Comments.create({
      comment,
      creator: userId,
      post: params.postId,
    });

    await Post.updateOne({ $inc: { numComments: 1 } });
    console.log("Updated Post");

    return NextResponse.json(Comment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
