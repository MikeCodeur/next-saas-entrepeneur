import * as dotenv from "dotenv"

import {defineConfig} from "drizzle-kit"

dotenv.config()

export default defineConfig({
  schema: "./src/data/models/*",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: "camel",
  },
})
