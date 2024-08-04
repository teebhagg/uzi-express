import NextAuth, { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendEmail } from "./email";
import { prisma } from "./prisma.client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { UserWithIncludes } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: AdapterUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface User {
    id?: string;
  }
}

declare module "next-auth" {
  interface AdapterUser extends User {}
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const salt = await bcrypt.genSalt(10);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials provided");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user?.password ?? ""
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          image: user?.image,
        };
      },
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user = token;
      session.user.id = token?.sub;
      return session;
    },
    async jwt({ token, user, account, session, trigger }) {
      if (trigger ===  'update') {
        token = session
      }
      token.accessToken = account?.access_token;
      return token;
    },
    async signIn ({user, account, profile, email}) {
      // if (user) {
      //   return true
      // }
      // return false
        try {
            if (!user.email) {
                throw new Error('Email is empty')
                // return false
            }
            const userData = await prisma.user.findUnique({
                where: {
                    email: user.email,
                }
            })
            // if (!userData?.name) {
            //   console.log(userData)
            //   throw new Error('Name is empty')
            //   // return false
            // }
            user.id = userData?.id!
            user.image = userData?.image
            if (!userData) {
                const newUser = await prisma.user.create({
                    data: {
                      email: user.email,
                      name: user.name,
                      image: user.image,
                      isEmailVerified: true
                    }
                  })
                user.id = newUser.id
                user.image = newUser.image
            }
            return true
        } catch (error: any) {
          throw new Error(error.message)
            // return false
        }
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    // verifyRequest: "/auth/verify-request",
  },
});
