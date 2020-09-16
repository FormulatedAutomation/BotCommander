import jwt from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

import { getToken } from './token'

interface Options {
  robotKey?: string;
}

async function authorize (req: NextApiRequest, options: Options) {
  const token = await getToken(req)
  return false
}

export default authorize
