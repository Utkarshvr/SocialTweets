import { connectToDB } from "@/connection/connectToDB";
import Comments from "@/models/Comments";
import Posts from "@/models/Posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// DELETE (delete)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const comment = await Comments.findById(params.commentId);

    if (!comment) return new Response("Comment not found", { status: 404 });

    return new Response(comment, { status: 200 });
  } catch (error) {
    console.log({ error });
    return new Response("Failed to delete the comment", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    const { postId } = await req.json();

    const session = await getServerSession(authOptions);

    const userId = session?.user?.id;

    if (!session) return new Response("Not logged in", { status: 401 });

    await connectToDB();

    const comment = await Comments.findById(params.commentId);

    if (!comment) return new Response("Comment not found", { status: 404 });

    console.log({ creator: comment?.creator?.toString() });

    if (userId !== comment?.creator?.toString())
      return new Response("Not authorized", { status: 403 });

    // Delete Comment
    await comment.deleteOne();

    const post = await Posts.findById(postId);

    // Decrement numComments field using $inc
    await post.updateOne({ $inc: { numComments: -1 } });

    return new Response("Comment deleted successfully", { status: 200 });
  } catch (error) {
    console.log({ error });
    return new Response("Failed to delete the comment", { status: 500 });
  }
};
