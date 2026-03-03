import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoConnect from "@/lib/mongoConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"; // mongoose ইমপোর্ট করতে হবে

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Enter email and password");
        }

        try {
          // ১. ডাটাবেস কানেক্ট করুন
          await mongoConnect();
          
          // ২. Mongoose থেকে সরাসরি native db অবজেক্টটি নিন
          const db = mongoose.connection.db; 

          if (!db) {
            throw new Error("Database connection failed");
          }

          const user = await db.collection("users").findOne({ 
            email: credentials.email.toLowerCase() 
          });

          if (!user || !user.password) {
            throw new Error("Invalid user or login method");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) throw new Error("Wrong password");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "user",
            image: user.image || null, 
          };
        } catch (error) {
          console.error("Auth Error:", error.message);
          return null; // অথেন্টিকেশন ফেইল করলে null রিটার্ন করবে (401 দিবে)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture; 
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };