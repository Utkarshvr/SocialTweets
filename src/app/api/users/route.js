import { connectToDB } from "@/connection/connectToDB";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const UsersDB = await Users.find().sort({ createdAt: -1 });

    return NextResponse.json(UsersDB, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
