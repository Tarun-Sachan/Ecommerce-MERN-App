import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

const adminEmails = ["tarunsachan1996@gmail.com"];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  // callbacks: {
  //   session: ({ session, token, user }) => {
  //     if (adminEmails.includes(session?.user?.email)) {
  //       return session;
  //     } else {
  //       return false;
  //     }
  //   },
  // },
};

export default NextAuth(authOptions);
