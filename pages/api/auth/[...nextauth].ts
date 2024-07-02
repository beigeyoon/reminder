import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { verifyPassword } from "@/src/utils/bcrypt";
import { getUserInfo, addUser } from "@/src/services/user";

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
        const isValid = await verifyPassword(credentials!.password, user.password as string);
        if (!isValid) throw new Error('Wrong Password!');
        return { id: user.id, name: user.name }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.email as string,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.provider = account.provider;
      };
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.provider = token.provider;
      }
      return session;
    },
    async signIn({ user, account, profile, email }) {
      if (account?.provider === 'github') {
        const existingUser = await getUserInfo({ name: profile?.email as string });
        if (!existingUser) {
          await addUser({
            id: (profile as GithubProfile)?.id.toString(),
            username: profile?.email as string,
          });
        }
      }
      return Promise.resolve(true);
    },
  },
})
