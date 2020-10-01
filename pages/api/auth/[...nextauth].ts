import NextAuth from 'next-auth'
import providers from '../../../config/auth'
import config from '../../../lib/config'
import { NextApiRequest, NextApiResponse } from 'next'

const SIGNIN_PATH = '/auth/signin'
const AFTER_SIGNIN_PATH = '/bots'

function setup(req: NextApiRequest, res: NextApiResponse<any>) {
  return config.get().then((configs) => {
    const options = {
      // Configure one or more authentication providers
      providers,
      secret: configs.secret,
      jwt: {
        secret: configs.secret
      },
      pages: {
        signIn: SIGNIN_PATH,
      },
      callbacks: {
        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        redirect: async (url, baseUrl) => {
          // Ensure we get redirected to /bots if the callback URL is /auth/signin
          if (new URL(url).pathname ===  SIGNIN_PATH) {
            return Promise.resolve(baseUrl + AFTER_SIGNIN_PATH)
          }
          return url.startsWith(baseUrl)
            ? Promise.resolve(url)
            : Promise.resolve(baseUrl)
        }
      },
      // A database is optional, but required to persist accounts in a database
      // database: process.env.DATABASE_URL,
    }
    return NextAuth(req, res, options)
  })
}

export default (req: NextApiRequest, res: NextApiResponse<any>) => setup(req, res)
