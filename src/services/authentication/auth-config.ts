import type {NextAuthConfig} from 'next-auth'
import ResendProvider from 'next-auth/providers/resend'
import {Resend} from 'resend'
import {DrizzleAdapter} from '@auth/drizzle-adapter'
import db from '@/data/db/client'
import {MagicLinkMail} from '../../../react-email-starter/emails/magic-link-email'
import {sendEmail} from '../email-service'
const resend = new Resend(process.env.RESEND_API_KEY)

export const authConfig = {
  trustHost: true,
  callbacks: {
    async redirect({url, baseUrl}) {
      return `${baseUrl}/dashboard`
    },
  },
  providers: [
    ResendProvider({
      apiKey: process.env.RESEND_API_KEY,
      sendVerificationRequest: async ({identifier: email, url}) => {
        const fromEmail = process.env.EMAIL_FROM

        if (!fromEmail) {
          throw new Error('EMAIL_FROM is not set')
        }
        await sendEmail({
          to: email,
          subject: 'Connexion sur la plateforme Tracker Entrepeneur',
          from: fromEmail,
          react: MagicLinkMail({url}),
        })
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'database',
  },
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig
