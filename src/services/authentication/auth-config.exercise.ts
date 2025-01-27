import type {NextAuthConfig} from 'next-auth'

// 🐶 Configure `NextAuth` pour avec le provider `Rensend`

// 🐶 Importe les modules suivants
// import ResendProvider from 'next-auth/providers/resend'
// import {Resend} from 'resend'
// import {DrizzleAdapter} from '@auth/drizzle-adapter'
// import db from '@/data/db/client'

// 🐶 Crée une instance de `Resend` avec l'API key
// const resend = new Resend(process.env.RESEND_API_KEY)

export const authConfig = {
  trustHost: true,
  callbacks: {},
  providers: [
    // 🐶 Ajoute le provider `Resend`
    // 🤖
    // ResendProvider({
    //   apiKey: process.env.RESEND_API_KEY,
    //   sendVerificationRequest: async ({identifier: email, url}) => {
    //     const fromEmail = process.env.EMAIL_FROM
    //   },
    // }),
    // 🐶 Pense à envoyer l'email de vérification
    // 🤖
    //const {error} = await resend.emails.send({ ...
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    // 🐶 Ajoute la stratégie database
  },
  // 🐶 Ajoute l'adapter `Drizzler`
  // 🤖
  // adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig
