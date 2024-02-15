import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env, getPrisma } from "@/config";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(getPrisma()),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     scope: [
      //       "https://www.googleapis.com/auth/calendar",
      //       "https://www.googleapis.com/auth/calendar.events",
      //     ].join(" "),
      //   },
      // },
    }),
  ],
  callbacks: {
    session: async ({ user, session }: any) => {
      if (user) {
        session.user.role = user.role;
        session.user.status = user.status;
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
