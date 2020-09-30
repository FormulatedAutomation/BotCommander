import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

import { get as getConfig } from '../lib/config'

export interface Token {
  name: string
  email: string
  picture?: string
  iat: number
  exp: number
}

export async function getToken (req: NextApiRequest): Promise<Token> {
  const config = await getConfig()
  return (await jwt.getToken({ req, secret: config.secret }) as Token)
}
