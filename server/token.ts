import jwt from 'next-auth/jwt'
import { NextApiRequest } from 'next'

import { get as getConfig } from '../lib/config'

export interface Token {
  name: string
  email: string
  picture?: string
  iat: number
  exp: number
}

export async function buildToken (token: Token): Promise<string> {
  const config = await getConfig()
  return jwt.encode({ token: token, secret: config.secret })
}

export async function getToken (req: NextApiRequest): Promise<Token | null> {
  const config = await getConfig()
  return (await jwt.getToken({ req, secret: config.secret }) as Token)
}
