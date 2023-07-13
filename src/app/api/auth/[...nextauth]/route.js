import User from "@/models/User";
import { connectToDB } from "@/connection/connectToDB";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Get the data of the user every single time
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      // Auto-created id sent by google is updated by the auto-created ID through MongdoDB
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      // When someone signs in with Google Auth, his profile will be passed to this function
      // Then, we save the user to our database after adding some logic
      try {
        // Serverless => lambda => dynamodb
        await connectToDB();
        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If not => create a new user and save user in MongoDB
        if (!userExists) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
