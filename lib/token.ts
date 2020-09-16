import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

import { get as getConfig } from './config'

export interface Token {
  name: string
  email: string
  picture?: string
  iat: Number
  exp: Number
}

export async function getToken (req: NextApiRequest): Promise<Token> {
  const config = await getConfig()
  return <Token> await jwt.getToken({ req, secret: config.secret })
}
