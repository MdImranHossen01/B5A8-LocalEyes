/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET environment variable is missing");
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        await dbConnect();
        
        let user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          user = await User.create({
            name: credentials.email.split('@')[0],
            email: credentials.email,
            password: 'demo_password_123',
            role: credentials.email.includes('admin') ? 'admin' : 'user',
          });
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const isAdmin = user.email === 'imranshuvo101@gmail.com' || user.email?.includes('admin');
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            existingUser = await User.create({
              name: user.name || "User",
              email: user.email,
              profilePic: user.image || "",
              role: isAdmin ? "admin" : "user",
            });
          } else {
            let isModified = false;
            if (user.image && existingUser.profilePic !== user.image) {
              existingUser.profilePic = user.image;
              isModified = true;
            }
            if (user.name && existingUser.name !== user.name) {
              existingUser.name = user.name;
              isModified = true;
            }
            if (isAdmin && existingUser.role !== "admin") {
              existingUser.role = "admin";
              isModified = true;
            }
            if (isModified) {
              await existingUser.save();
            }
          }

          user.id = existingUser._id.toString();
          (user as any).role = existingUser.role;
          (user as any).profilePic = existingUser.profilePic || user.image || "";
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.email = user.email;
        token.name = user.name;
        const avatarUrl = user.image || (user as any).profilePic || token.picture || '';
        token.profilePic = avatarUrl;
        token.picture = avatarUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || 'user';
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        const avatarUrl = (token.picture || token.profilePic) as string || '';
        session.user.profilePic = avatarUrl;
        session.user.image = avatarUrl;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };