import User from "@/models/User";
import { connectToDB } from "@/connection/connectToDB";
import Posts from "@/models/Posts";

// GET(read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Posts.findById(params.postId);

    if (!post) return new Response("Posts not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};

// PUT (update)
export const PUT = async (req, { params }) => {
  const { body, image } = await req.json();
  try {
    await connectToDB();

    const updatedPost = await Posts.findByIdAndUpdate(
      params.postId,
      { body, image },
      { new: true }
    );

    if (!updatedPost) return new Response("Post not found", { status: 404 });

    return new Response(JSON.stringify(updatedPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    const { userId } = await req.json();

    await connectToDB();

    const post = await Posts.findById(params.postId);

    if (!post) return new Response("Post not found", { status: 404 });

    console.log({ creator: post?.creator?.toString() });

    if (userId !== post?.creator?.toString())
      return new Response("Not authorized", { status: 403 });

    // Delete Post
    await post.deleteOne();

    const Creator = await User.findById(userId);
    await Creator.updateOne({ $inc: { numPosts: -1 } });

    return new Response("Comment deleted successfully", { status: 200 });
  } catch (error) {
    console.log({ error });
    return new Response("Failed to delete the post", { status: 500 });
  }
};
