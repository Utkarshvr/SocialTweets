import User from "@/models/User";
import { connectToDB } from "@/connection/connectToDB";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ user });
      if (user) {
        // Get the data of the user every single time
        const userDB = await User.findOne({
          email: user.email,
        });
        if (userDB) {
          // Auto-created id sent by google is updated by the auto-created ID through MongdoDB
          token.id = userDB._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log({ token });
      const { name, email, picture: image, id } = token;
      session.user = { name, email, image, id };
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
            username: profile.name,
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
