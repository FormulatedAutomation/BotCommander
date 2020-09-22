import NextAuth from 'next-auth'
import providers from '../../../config/auth'
import config from '../../../lib/config'
import { NextApiRequest, NextApiResponse } from 'next'

function setup(req: NextApiRequest, res: NextApiResponse<any>) {
  return config.get().then((configs) => {
    const options = {
      // Configure one or more authentication providers
      providers,
      secret: configs.secret,
      jwt: {
        secret: configs.secret
      }

      // A database is optional, but required to persist accounts in a database
      // database: process.env.DATABASE_URL,
    }
    return NextAuth(req, res, options)
  })
}

export default (req: NextApiRequest, res: NextApiResponse<any>) => setup(req, res)
