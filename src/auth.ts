import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { faildLogin, successLogin } from "./types/authInterface";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [

    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },


        });



        // if(!response.ok){
        //   return null
        // }

        const payload: faildLogin | successLogin = await response.json();

        console.log(payload);

        if ('token' in payload) {
          return {
            id: payload.user.email,
            name: payload.user.name,
            email: payload.user.email,
            user: payload.user,
            token: payload.token
          };
        }
        throw new Error('error')

      },
    }),
  ],




  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user
        token.token = user.token
      }

      return token

    },
    session: ({ session, token }) => {
      session.user = token.user 
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',

};
