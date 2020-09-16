import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../lib/token'

import authenticate from '../../middleware/authenticate'

export const handler = (req: NextApiRequest, res: NextApiResponse, token: Token) => {
  console.log('JSON Web Token', token)
  res.statusCode = 200
  res.json({token})
}

export default authenticate(handler)