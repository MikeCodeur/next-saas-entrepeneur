import type {NextAuthConfig} from "next-auth"
import Resend from "next-auth/providers/resend"
import MagicLinkMail from "../../../react-email-starter/emails/magic-link-email"
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import db from "@/data/db/client"
import {EmailService} from "@/services/email-service"

export const authConfig = {
  trustHost: true, //mike: for testing production mode in local, fon better solution
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    verifyRequest: "/verify-request",
    error: "/error",
  },
  callbacks: {
    // session: async ({session, token}) => {
    //   console.log("session", session)
    //   console.log("token", token)
    //   //session.user.id = token.sub
    //   return session
    // },
    authorized({auth, request: {nextUrl}}) {
      console.log("authorized", auth)
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isPublicRoute = nextUrl.pathname.startsWith("/public")
      if (isPublicRoute) {
        return true // Autorise toujours l'accès à `/public`
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
    async redirect({url, baseUrl}) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      sendVerificationRequest: async ({identifier: email, url}) => {
        const fromEmail = process.env.EMAIL_FROM

        if (!fromEmail) {
          throw new Error("EMAIL_FROM is not set")
        }
        await EmailService.sendEmail({
          to: email,
          subject: "Connexion sur la plateforme Tracker Entrepeneur",
          from: fromEmail,
          react: MagicLinkMail({url}),
        })
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig
