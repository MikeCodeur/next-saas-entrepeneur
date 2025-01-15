import * as dotenv from 'dotenv'
import * as user from '@/data/models/user-model'
import * as finance from '@/data/models/finance-model'
import * as health from '@/data/models/health-model'
import {Pool} from 'pg'
import {drizzle} from 'drizzle-orm/node-postgres'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool, {schema: {...user, ...finance, ...health}})

export default db
