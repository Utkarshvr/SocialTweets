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
    await connectToDB();

    const post = await Posts.findByIdAndDelete(params.postId);

    if (!post) return new Response("Posts not found", { status: 404 });

    return new Response("Post Deleted Successfully", { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
