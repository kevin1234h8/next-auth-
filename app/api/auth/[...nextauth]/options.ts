import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/user";
import axios from "axios";
import { connect } from "@/database/connection";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        console.log(credentials);
        try {
          await connect();
          console.log((credentials as any).email);
          const user = await User.findOne({
            email: (credentials as any).email,
          });

          console.log(user.password);
          const isPasswordMatch = await bcrypt.compare(
            (credentials as any).password,
            user.password
          );
          console.log(isPasswordMatch);
          if (isPasswordMatch) {
            return user;
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {      },
    //   async authorize(credentials) {
    //     const user = await User.findOne({ name: credentials?.username });

    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async signIn(credentials): Promise<any> {
  //     if (credentials.account?.provider === "google") {
  //       return credentials.user;
  //     } else {
  //       try {
  //         await connect();
  //         console.log(credentials.user.email);
  //         const user = await User.findOne({
  //           email: credentials.user.email,
  //         });
  //         return user;
  //         // console.log(user.password);
  //         // const isPasswordMatch = await bcrypt.compare(
  //         //   (credentials as any).password,
  //         //   user.password
  //         // );
  //         // console.log(isPasswordMatch);
  //         // if (isPasswordMatch) {
  //         //   return user;
  //         // }
  //       } catch (err) {
  //         console.log(err);
  //         return null;
  //       }
  //     }
  //     console.log(credentials);
  //   },
  // },
  pages: {
    signIn: "/signin",
  },
};
