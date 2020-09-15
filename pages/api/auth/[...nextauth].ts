import NextAuth from 'next-auth'
import providers from '../../../config/auth'
import { NextApiRequest, NextApiResponse } from 'next'

const options = {
  // Configure one or more authentication providers
  providers

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
}

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)