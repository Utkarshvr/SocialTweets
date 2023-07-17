import { connectToDB } from "@/connection/connectToDB";
import Posts from "@/models/Posts";
import { Types } from "mongoose";

// POST (like or dislike)
export const POST = async (req, { params }) => {
  try {
    const { userId } = await req.json();
    const isValidId = Types.ObjectId.isValid(userId);
    if (!isValidId) return new Response("User Id not valid", { status: 400 });

    await connectToDB();

    const Post = await Posts.findById(params.postId);

    if (!Post.likes.includes(userId.toString())) {
      await Post.updateOne({ $push: { likes: userId } });
      return new Response("Like added", { status: 200 });
    } else {
      await Post.updateOne({ $pull: { likes: userId } });
      return new Response("Like removed", { status: 200 });
    }
  } catch (error) {
    console.log({ errorInLike: error });
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
