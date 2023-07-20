import { connectToDB } from "@/connection/connectToDB";
import Users from "@/models/User";
import { Types } from "mongoose";

// User (Follow & Unfollow)

export const POST = async (req, { params }) => {
  try {
    const { userId } = await req.json();
    const isValidId = Types.ObjectId.isValid(userId);
    if (!isValidId) return new Response("User Id not valid", { status: 400 });

    await connectToDB();

    const User = await Users.findById(params.userId);
    const Me = await Users.findById(userId);

    // Don't let a user follow himself
    if (userId.toString() === params.userId.toString())
      return new Response("Can't follow yourself. Tez chal raha hai kya", {
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
