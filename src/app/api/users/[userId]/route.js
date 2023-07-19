import { connectToDB } from "@/connection/connectToDB";
import Users from "@/models/User";

// GET(read)
export const GET = async (_req, { params }) => {
  try {
    await connectToDB();

    const user = await Users.findById(params.userId);

    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
