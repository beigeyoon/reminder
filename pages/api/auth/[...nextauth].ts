import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/src/utils/bcrypt";
import { getUserInfo } from "@/src/services/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'username-password-credential',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials: Record<"name" | "password", string> | undefined) {
        const user = await getUserInfo({ name: credentials?.name as string });
        if (!user) throw new Error('Wrong User!');
        // const isValid = await verifyPassword(credentials!.password, user.password as string);
        const isValid = credentials!.password === user.password;
        if (!isValid) throw new Error('Wrong Password!');
        return { id: user.id, name: user.name }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      };
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  }
})