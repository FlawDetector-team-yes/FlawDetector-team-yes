import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";

export const authConfig = {
  session: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // null 값을 명시적으로 false로 표시하기 위해 이중부정을 사용한다.
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/me");
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        // Redirect unauthenticated users to login page
        return false;
      }
      return true;
    },
  },
  providers: [
    // 일반 로그인 로직 및 유효성 검사
    Credentials({}),
    // github OAuth
    github({
      clientId: process.env.NEXT_PUBLIC_AUTH_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
