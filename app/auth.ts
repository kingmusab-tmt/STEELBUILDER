import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import clientPromise from "@/utils/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions, SessionStrategy } from "next-auth";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          username: profile.sub,
          email: profile.email,
          emailVerified: profile.email_verified,
          name: profile.name,
          image: profile.picture,
          emailToken: null,
          isActive: true,
          role: "User",
        };
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 1 * 60 * 60, // 1 hour
    updateAge: 10, // Update every 10 seconds to check DB more frequently
  },
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        if (new URL(url).origin === baseUrl) {
          return url;
        }
      } catch {
        // Fallback to baseUrl for malformed or unsafe callback URLs.
      }

      return baseUrl;
    },

    async jwt({ token, trigger, session, user }) {
      // Log only on initial authentication (user object only exists on first JWT creation)
      // For Credentials: logging already happens in authorize callback
      // For OAuth (Google): this is the only place we get the user object on first auth
      if (user && !token.loggedAt) {
        token.loggedAt = new Date().getTime();
      }

      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
        token.image = user.image;
        token.isActive = user.isActive;
        token.role = user.role;
      } else if (trigger === "update" && session) {
        // Update token when session is explicitly updated
        token.email = session.user?.email || token.email;
        token.name = session.user?.name || token.name;
        token.id = session.user?.id || token.id;
        token.image = session.user?.image || token.image;
        token.isActive = session.user?.isActive || token.isActive;
        token.role = session.user?.role || token.role;
      } else if (token.email) {
        // ALWAYS refresh token from database on every request
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email });

          if (dbUser) {
            const oldRole = token.role;
            // Update token with fresh data from database
            token.email = dbUser.email;
            token.name = dbUser.name;
            token.id = dbUser._id.toString();
            token.image = dbUser.image;
            token.isActive = dbUser.isActive;
            token.role = dbUser.role;
          }
        } catch (error) {
          throw error;
        }
      }
      return token;
    },
    async session({ session, token }) {
      try {
        // Always populate session from token (which is refreshed from DB in jwt callback)
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.isActive = token.isActive as boolean;
        session.user.role = token.role as string;

        return session;
      } catch (error) {
        throw error;
      }
    },
  },
} as NextAuthOptions;
