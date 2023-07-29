import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/connection/connectToDB";
import Users from "@/models/User";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

// User (Follow & Unfollow)

export const POST = async (req, { params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Not logged in", { status: 401 });

    const userId = session?.user?.id;

    await connectToDB();

    const User = await Users.findById(params.userId);
    const Me = await Users.findById(userId);

    // Don't let a user follow himself
    if (userId.toString() === params.userId.toString())
      return new Response("Great guy! But you can't follow yourself! LOL!", {
        status: 400,
      });

    if (!User.followers.includes(userId.toString())) {
      await User.updateOne({ $push: { followers: userId } });
      await Me.updateOne({ $push: { followings: params.userId } });
      return new Response("Followed", { status: 200 });
    } else {
      await User.updateOne({ $pull: { followers: userId } });
      await Me.updateOne({ $pull: { followings: params.userId } });
      return new Response("Unfollowed", { status: 200 });
    }
  } catch (error) {
    console.log({ error });
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
